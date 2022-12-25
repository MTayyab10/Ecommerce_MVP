from datetime import datetime
from products2.models import Product
from cart3.models import Cart, CartItem
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from django.contrib.auth import get_user_model

User = get_user_model()


# Get total price for Order in checkout.js
class GetTotalPriceView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)

            # Check to see whether user has items in their cart
            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {'error': 'Need to have items in cart'},
                    status=status.HTTP_404_NOT_FOUND
                )

            cart_items = CartItem.objects.filter(cart=cart)

            # Check to see whether there is enough quantity of each item in stock
            for cart_item in cart_items:

                if not Product.objects.filter(id=cart_item.product.id).exists():
                    return Response(
                        {'error': 'A product with ID provided does not exist'},
                        status=status.HTTP_404_NOT_FOUND
                    )
                if int(cart_item.count) > int(cart_item.product.quantity):
                    return Response(
                        {'error': 'Not enough items in stock'},
                        status=status.HTTP_200_OK
                    )

            # update our total order cost

            sub_total = 0.0
            delivery_fee = 0.0
            service_fee = 0.0
            total_amount = 0.0

            for cart_item in cart_items:

                # if product have discount
                if cart_item.product.discount:
                    price = cart_item.product.price - cart_item.product.discount
                    sub_total += float(price) * float(cart_item.count)

                else:
                    sub_total += (float(cart_item.product.price)
                                     * float(cart_item.count))

            # just can decide how much should charge delivery fee

            if 2000 < sub_total < 4000:
                delivery_fee += 200
            elif 4000 < sub_total < 6000:
                delivery_fee += 300
            else:
                delivery_fee += 100

            # just can decide how much should charge Service fee

            if 2000 < sub_total < 4000:
                service_fee += 100
            elif 4000 < sub_total < 6000:
                service_fee += 50
            else:
                service_fee += 0

            # Actual Total Amount
            total_amount += sub_total + delivery_fee + service_fee

            return Response(
                {
                    'sub_total': f'{sub_total:.1f}',
                    'delivery_fee': f'{delivery_fee:.1f}',
                    'service_fee': f'{service_fee:.1f}',
                    'total_amount': f'{total_amount:.1f}',
                },
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving order total price.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# For more info check this code
# github.com/MTayyab10/shop_time/blob/main/backend/payment/views.py
# Try to Create Order

class CreateOrderView(APIView):

    def post(self, request, format=None):

        user = self.request.user
        data = self.request.data

        full_name = data['full_name']
        address = data['address']
        city = data['city']
        mobile = data['mobile']

        # get user cart
        cart = Cart.objects.get(user=user)

        # Check whether user has items in their cart or not

        items = CartItem.objects.filter(cart=cart).exists()
        if not items:
            return Response(
                {'error': 'First need to have items in cart.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # get cart items
        cart_items = CartItem.objects.filter(cart=cart)

        # Check to see whether there is enough quantity of each item in stock
        for cart_item in cart_items:

            product_id = Product.objects.filter(id=cart_item.product.id).exists()

            if not product_id:
                return Response(
                    {'error': 'A product ID does not exist.'},
                    status=status.HTTP_404_NOT_FOUND
                )

            if int(cart_item.count) > int(cart_item.product.quantity):

                return Response(
                    {'error': 'Not enough items in stock.'},
                    status=status.HTTP_200_OK
                )

        # update our total order cost
        total_amount = 0.0

        for cart_item in cart_items:
            if cart_item.product.discount:
                price = cart_item.product.price - cart_item.product.discount
                total_amount += float(price) * float(cart_item.count)

            else:
                 total_amount += (float(cart_item.product.price)
                                * float(cart_item.count))

        print("Total amount is: ", total_amount)

        try:
            order = Order.objects.create(
                user=user,
                # transaction_id=transaction_id,
                amount=total_amount,
                full_name=full_name,
                address=address,
                city=city,
                mobile=mobile,
            )
            for cart_item in cart_items:
                # Get product object to update
                update_product = Product.objects.get(id=cart_item.product.id)

                # Find quantity after purchase
                quantity = int(update_product.quantity) - int(cart_item.count)

                # Get the amount that will be sold
                #  = int(update_product.sold) + int(cart_item.count)

                # Update the product
                Product.objects.filter(id=cart_item.product.id).update(
                    quantity=quantity,
                    # sold=sold
                )
                print("Order has been created, Successfully.")

        except:

            print("Unable to create fucking order.")
            return Response(
                {'error': 'Failed to create the order.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        for cart_item in cart_items:
            try:
                # Get the product instance
                product = Product.objects.get(id=cart_item.product.id)

                OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    price=cart_item.product.price,
                    count=cart_item.count
                )
                print("CartItem count is:", cart_item.count)
                print("OrderItem has been created too.")
            except:
                return Response(
                    {'error': 'Order created, but failed to create OrderItem.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            try:
                # Empty the Cart
                CartItem.objects.filter(cart=cart).delete()

                # Update cart to have no items
                Cart.objects.filter(user=user).update(total_items=0)

            except:

                return Response(
                    {'error': 'Order created successful, but failed to clear cart.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            return Response(
                {'success': 'Order and OrderItem was created. Successfully.'},
                status=status.HTTP_200_OK
            )


# class CreateOrderView(APIView):
#
#     def post(self, request, format=None):
#
#         user = self.request.user
#         data = self.request.data
#
#         full_name = data['full_name']
#         address = data['address']
#         city = data['city']
#         mobile = data['mobile']
#
#         # transaction_id = datetime.now()
#         transaction_id = data['transaction_id']
#
#         cart = Cart.objects.get(user=user)
#
#         # Check whether user has items in their cart or not
#
#         items = CartItem.objects.filter(cart=cart).exists()
#
#         if not items:
#             return Response(
#                 {'error': 'First need to have items in cart.'},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#
#         # get cart items
#
#         cart_items = CartItem.objects.filter(cart=cart)
#
#         # Check to see whether there is enough quantity of each item in stock
#         for cart_item in cart_items:
#
#             product_id = Product.objects.filter(id=cart_item.product.id).exists()
#             if not product_id:
#                 return Response(
#                     {'error': 'A product ID does not exist'},
#                     status=status.HTTP_404_NOT_FOUND
#                 )
#
#             if int(cart_item.count) > int(cart_item.product.quantity):
#                 return Response(
#                     {'error': 'Not enough items in stock.'},
#                     status=status.HTTP_200_OK
#                 )
#
#         # update our total order cost
#         total_amount = 0.0
#
#         for cart_item in cart_items:
#             total_amount += (float(cart_item.product.price)
#                             * float(cart_item.count))
#
#             try:
#                 order = Order.objects.create(
#                     user=user,
#                     transaction_id=transaction_id,
#                     amount=total_amount,
#                     full_name=full_name,
#                     address=address,
#                     city=city,
#                     mobile=mobile,
#                 )
#                 for cart_item in cart_items:
#                     # Get product object to update
#                     update_product = Product.objects.get(id=cart_item.product.id)
#
#                     # Find quantity after purchase
#                     quantity = int(update_product.quantity) - int(cart_item.count)
#
#                     # Get the amount that will be sold
#                     # sold = int(update_product.sold) + int(cart_item.count)
#
#                     # Update the product
#                     Product.objects.filter(id=cart_item.product.id).update(
#                         quantity=quantity,
#                         # sold=sold
#                     )
#                 print("Order has been created, Successfully.")
#
#             except:
#
#                 print("Unable to create fucking order.")
#                 return Response(
#                     {'error': 'Failed to create the order.'},
#                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
#                 )
#
#             for cart_item in cart_items:
#                 try:
#                     # Get the product instance
#                     product = Product.objects.get(id=cart_item.product.id)
#
#                     OrderItem.objects.create(
#                         product=product,
#                         order=order,
#                         name=product.name,
#                         price=cart_item.product.price,
#                         count=cart_item.count
#                     )
#                 except:
#                     return Response(
#                         {'error': 'Order created, but failed to create OrderItem.'},
#                         status=status.HTTP_500_INTERNAL_SERVER_ERROR
#                     )
#
#                 try:
#                     # Empty the Cart
#                     CartItem.objects.filter(cart=cart).delete()
#
#                     # Update cart to have no items
#                     Cart.objects.filter(user=user).update(total_items=0)
#
#                 except:
#
#                     return Response(
#                         {'error': 'Order successful, but failed to clear cart.'},
#                         status=status.HTTP_500_INTERNAL_SERVER_ERROR
#                     )
#
#                 return Response(
#                     {'success': 'Order and OrderItem was created. Successfully.'},
#                     status=status.HTTP_200_OK
#                 )


# For all orders
class ListOrdersView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            # Retrieve the user's orders and order them by the date
            orders = Order.objects.order_by('-created_date').filter(user=user)

            # This will be where we store the orders and what we send back to the frontend
            result = []

            for order in orders:
                # The order itself
                item = {}

                item['user'] = order.user.email
                item['status'] = order.status
                item['transaction_id'] = order.transaction_id
                item['amount'] = order.amount
                # item['shipping_price'] = order.shipping_price
                # item['date_issued'] = order.date_issued
                item['created_date'] = order.created_date

                result.append(item)

            return Response(
                {'orders': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving orders'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Detail of one specific order
class ListOrderDetailView(APIView):
    def get(self, request, transactionId, format=None):
        user = self.request.user

        try:
            # Check to see if any order with user and transaction id exists
            if Order.objects.filter(user=user, transaction_id=transactionId).exists():
                # Retrieve the user's orders and order them by the date
                order = Order.objects.get(
                    user=user, transaction_id=transactionId)

                # This will be where we store the orders and what we send back to the frontend
                result = {}

                result['status'] = order.status
                result['transaction_id'] = order.transaction_id
                result['amount'] = order.amount
                result['full_name'] = order.full_name
                result['address'] = order.address
                # result['address_line_2'] = order.address_line_2
                result['city'] = order.city
                result['mobile'] = order.mobile
                result['created_date'] = order.created_date

                order_items = OrderItem.objects.order_by(
                    '-created_date').filter(order=order)

                # The order items associated with the order
                result['order_items'] = []

                for order_item in order_items:
                    # The order item
                    sub_item = {}

                    product = Product.objects.get(id=order_item.product.id)

                    sub_item['product'] = product
                    sub_item['name'] = order_item.name
                    sub_item['price'] = order_item.price
                    sub_item['count'] = order_item.count

                    result['order_items'].append(sub_item)

                return Response(
                    {'order': result},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Order with this transaction ID does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving order detail'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
