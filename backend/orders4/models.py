import uuid as uuid
from products2.models import Product
from django.db import models
from datetime import datetime
from shops1.models import TimeStampModel
from shortuuid.django_fields import ShortUUIDField
import shortuuid
from django.contrib.auth import get_user_model
User = get_user_model()


class Order(TimeStampModel):
    class OrderStatus(models.TextChoices):
        not_processed = 'not_processed'
        processed = 'processed'
        shipping = 'shipped'
        delivered = 'delivered'
        cancelled = 'cancelled'

    status = models.CharField(
        max_length=50, choices=OrderStatus.choices, default=OrderStatus.not_processed)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Unique Order Id of 11 digits
    unique_id = ShortUUIDField(unique=True, length=11, max_length=11, editable=False)

    # very big id almost 37 digits
    # uuid = models.UUIDField(default=uuid.uuid4, unique=True, db_index=True, editable=False)

    amount = models.DecimalField(max_digits=7, decimal_places=2)

    # address for deliver order

    full_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    mobile = models.CharField(max_length=11)

    def __str__(self):
        return f"User: {self.user}"


class OrderItem(TimeStampModel):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    count = models.IntegerField()

    def __str__(self):
        return self.name

