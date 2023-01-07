from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from products2.models import Product
from cart3.models import Cart, CartItem
from delivery_address4.models import DeliveryAddress
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


# Create Order (total price, order items etx)

class CreateOrderView(APIView):

    # Get total price (sub-total, delivery & service fee)
    def get(self, request, format=None):
        user = self.request.user

        try:
            # get user cart
            cart = Cart.objects.get(user=user)

            # check cart items
            cart_items = CartItem.objects.filter(cart=cart)

            # our all total order cost

            sub_total = 0.0
            delivery_fee = 0.0
            service_fee = 0.0
            total_amount = 0.0

            for cart_item in cart_items:

                # if product have discount
                if cart_item.product.discount:
                    price = cart_item.product.price - cart_item.product.discount
                    sub_total += float(price) * float(cart_item.quantity)

                else:
                    sub_total += (float(cart_item.product.price)
                                  * float(cart_item.quantity))

            # just can decide later how much should charge delivery fee

            if 2000 < sub_total < 4000:
                delivery_fee += 200
            elif 4000 < sub_total < 6000:
                delivery_fee += 300
            else:
                delivery_fee += 100

            # just can decide later how much should charge Service fee

            if 2000 < sub_total < 4000:
                service_fee += 100
            elif 4000 < sub_total < 6000:
                service_fee += 50
            else:
                service_fee += 0

            # Actual Total Amount for order
            total_amount += sub_total + delivery_fee + service_fee

            return Response(
                {
                    'sub_total': f'{sub_total:.1f}',
                    'delivery_fee': f'{delivery_fee:.1f}',
                    'service_fee': f'{service_fee:.1f}',
                    'total_amount': f'{total_amount:.1f}',
                }, status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving order total price.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


    # Create order with items
    def post(self, request, format=None):

        user = self.request.user
        data = self.request.data

        # full_name = data['full_name']
        # address = data['address']
        # city = data['city']
        # mobile = data['mobile']

        # first get user cart
        cart = Cart.objects.get(user=user)

        # Check whether user has items in their cart or not

        items = CartItem.objects.filter(cart=cart).exists()
        if not items:
            return Response(
                {"error": "You don't have items in cart, first add."},
                status=status.HTTP_404_NOT_FOUND
            )

        # get cart items
        cart_items = CartItem.objects.filter(cart=cart)

        # Check if there is enough quantity of product in stock

        for cart_item in cart_items:
            product_id = Product.objects.filter(id=cart_item.product.id).exists()

            if not product_id:
                return Response(
                    {"error": "A product ID does not exist."},
                    status=status.HTTP_404_NOT_FOUND
                )

            if int(cart_item.quantity) > int(cart_item.product.quantity):
                return Response(
                    {"error": "Not enough items in stock."},
                    status=status.HTTP_200_OK
                )

        # Calculate total cost for items (sub-total)
        sub_total = 0

        # update our total order cost

        delivery_fee = 0.0
        service_fee = 0.0
        total_amount = 0.0

        # Get sub-total
        for cart_item in cart_items:
            if cart_item.product.discount:
                price = cart_item.product.price - cart_item.product.discount
                sub_total += float(price) * float(cart_item.quantity)

            else:
                sub_total += (float(cart_item.product.price) * float(cart_item.quantity))

        # just can decide later how much should charge delivery fee


        # Get delivery fee
        if 2000 < sub_total < 4000:
           delivery_fee += 200
        elif 4000 < sub_total < 6000:
           delivery_fee += 300
        else:
           delivery_fee += 100

        # just can decide later how much should charge Service fee
        if 2000 < sub_total < 4000:
            service_fee += 100
        elif 4000 < sub_total < 6000:
            service_fee += 50
        else:
           service_fee += 0

       # All Total Amount
        total_amount += sub_total + delivery_fee + service_fee

        print("Sub-total amount is: ", sub_total)
        print("Total amount is: ", total_amount)


        # Get DeliveryAddress
        # If user don't have addr/active addr then show this error

        try:
            # If delivery address doesn't exist
            if not DeliveryAddress.objects.filter(user=user).exists():
                print("Delivery address doesn't exist.")
                return Response({"error": "Please add delivery address."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            delivery_address = DeliveryAddress.objects.get(
                user=user,
                # name=name,
                # city=city,
                # mobile=mobile,
                addr_status=True)

        except DeliveryAddress.DoesNotExist:

            print("Delivery address is not selected.")
            return Response({"error": "Please select delivery address."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        # Create Order

        try:
            order = Order.objects.create(
                user=user,

                sub_total=sub_total,
                delivery_fee=delivery_fee,
                service_fee=service_fee,
                total_amount=total_amount,

                # full_name=full_name,
                address=delivery_address,
                # city=city,
                # mobile=mobile,
            )
            print("Order Id: ", order.id)
            print("Order has been created, successfully.")
            print("After creating order:", order.address)

            for cart_item in cart_items:
                # Get product object to update
                update_product = Product.objects.get(id=cart_item.product.id)

                # Find quantity after purchase
                quantity = int(update_product.quantity) - int(cart_item.quantity)

                # Get the amount that will be sold
                #  = int(update_product.sold) + int(cart_item.count)

                # Update the product
                Product.objects.filter(id=cart_item.product.id).update(
                    quantity=quantity,
                    # sold=sold
                )

        except:
            print("Failed to create the order.")
            return Response(
                {"error": "Failed to create the order."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


        # Create OrderItems

        for cart_item in cart_items:

            # First calculate here price let suppose if a product have
            # discount so price will reduce if we add cart_item.product.price
            # then this will just add product price not discounted price

            # Try to display right price here
            price = 0.0
            if cart_item.product.discount_price:
                price = cart_item.product.price - cart_item.product.discount
            else:
                price =  cart_item.product.price


            try:
                # Get the product instance
                product = Product.objects.get(id=cart_item.product.id)

                # print("Product in OrderItem: ", product)

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    name=product.name,
                    # price=cart_item.product.price,
                    price=price,
                    quantity=cart_item.quantity
                )
                print("CartItem quantity is:", cart_item.quantity)
                print("OrderItem has been created too.")

                # return Response(
                #     {"success": "OrderItem Created too."},
                #     status=status.HTTP_200_OK
                # )

            except:

                print("Order created, but failed to create OrderItem.")
                return Response(
                    {"error": "Order created, but failed to create OrderItem."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        # Empty/Delete cart after creating Order & OrderItem

        try:
                # Empty the Cart
                CartItem.objects.filter(cart=cart).delete()

                # Update cart to have no items
                Cart.objects.filter(user=user).update(total_items=0)

        except:

                return Response(
                    {"error": "Order created, but failed to clear CartItem."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )


        return Response(
            {"success": "Order and OrderItem was created. successfully."},
                status=status.HTTP_200_OK
            )
    # For more info about Create order
    # github.com/MTayyab10/shop_time/blob/main/backend/payment/views.py


# Get all orders

class GetOrdersView(APIView):

    def get(self, request, format=None):

        user = self.request.user

        # Retrieve user's Orders & order them by the date
        orders = Order.objects.filter(user=user).order_by('-created_date')
        order_serializer = OrderSerializer(orders, many=True)

        # Retrieve OrderItems

        order_items = OrderItem.objects.filter(order__user=user)
        order_items_serializer = OrderItemSerializer(order_items, many=True)


        if order_serializer:
            return Response(
                {'orders': order_serializer.data,
                 'order_items': order_items_serializer.data},
                status=status.HTTP_200_OK)

        return Response({"error": "Orders not found for user."},
                         status=status.HTTP_404_NOT_FOUND)


# This one works without serializer
# for more info see this code
# github.com/MTayyab10/shop_time/blob/main/backend/orders/views.py

# class GetOrdersView(APIView):
#     def get(self, request, format=None):
#         user = self.request.user
#
#         try:
#             # Retrieve the user's orders and order them by the date
#             orders = Order.objects.order_by('-created_date').filter(user=user)
#
#             # This will be where we store the orders and
#             # what we send back to the frontend
#             result = []
#
#             for order in orders:
#                 # The order itself
#                 item = {}
#
#                 item['user'] = order.user.email
#                 item['amount'] = order.amount
#                 item['unique_id'] = order.unique_id
#                 item['status'] = order.status
#                 # below line give error
#                 # item['address'] = order.address.city
#                 item['created_date'] = order.created_date
#                 item['shop_detail'] = order.shop_detail
#                 item['order_item_details'] = order.order_item_details
#
#                 result.append(item)
#
#             # Retrieve OrderItem
#
#             order_items = OrderItem.objects.get(order=4)

#             return Response(
#                 {'orders': result, 'order_items': order_items},
#                 status=status.HTTP_200_OK
#             )
#         except:
#             return Response(
#                 {'error': 'Something went wrong when retrieving orders'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )




# Get Specific/One order detail
class GetSpecificOrderView(APIView):

    def get(self, request, order_id, format=None):

        user = self.request.user

        try:
            order = Order.objects.filter(user=user, id=order_id).exists()
            if order:

                # Retrieve user's Orders & order them by the date
                specific_order = Order.objects.get(user=user, id=order_id)

                # as we have only one so can't iterate so no
                # need to add many=True as we did in others
                order_serializer = OrderSerializer(specific_order)

                # Retrieve OrderItems
                order_items = OrderItem.objects.filter(order=specific_order)
                order_items_serializer = OrderItemSerializer(order_items, many=True)

                if order_serializer:
                    return Response(
                        {'specific_order': order_serializer.data,
                         'specific_order_items': order_items_serializer.data},
                        status=status.HTTP_200_OK)

            else:
                return Response({"error": "Order with this Id doesn't exist."}, status=status.HTTP_404_NOT_FOUND)

        except:

            return Response({"error": "Something went wrong when retrieving order detail."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



