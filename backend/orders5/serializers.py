from rest_framework.serializers import ModelSerializer
from drf_writable_nested.serializers import WritableNestedModelSerializer
from .models import Order, OrderItem
from products2.models import Product
from delivery_address4.models import DeliveryAddress
from django.contrib.auth import get_user_model
User = get_user_model()


# Get User detail
class UserSerializer(WritableNestedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
        # fields = '__all__'


# Get delivery address detail
class AddressSerializer(WritableNestedModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = ['id', 'name', 'address', 'city', 'mobile']
        # fields = '__all__'


# Get all order info
class OrderSerializer(ModelSerializer):
    user = UserSerializer(allow_null=True)
    address = AddressSerializer(allow_null=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'unique_id',
            'status', 'created_date',
            'sub_total', 'delivery_fee',
            'service_fee', 'total_amount',
            'address', 'shop_detail', 'product_detail',
            'order_item_details'
        ]
        # fields = '__all__'


class OrderInOrderItemSerializer(WritableNestedModelSerializer):
    user = UserSerializer(allow_null=True)
    address = AddressSerializer(allow_null=True)

    class Meta:
        model = Order
        fields = ['id', 'unique_id', 'user', 'sub_total',
                  'total_amount', 'address']


class ProductSerializer(WritableNestedModelSerializer):

    class Meta:
        model = Product
        # fields = ['name', 'price', 'discount']
        fields = "__all__"

class OrderItemSerializer(ModelSerializer):
    order = OrderInOrderItemSerializer(allow_null=True)
    product = ProductSerializer(allow_null=True)

    class Meta:
        model = OrderItem
        fields = [
            'id', 'order', 'product',
            'name', 'price', 'quantity',
            'order_item_details'
        ]
        # fields = '__all__'

