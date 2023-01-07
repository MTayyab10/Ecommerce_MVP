# Generated by Django 4.1.4 on 2023-01-06 13:52

from django.db import migrations
import shortuuid.django_fields


class Migration(migrations.Migration):

    dependencies = [
        ('orders5', '0027_alter_order_unique_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='unique_id',
            field=shortuuid.django_fields.ShortUUIDField(alphabet='0123456789', editable=False, length=13, max_length=13, prefix='', unique=True),
        ),
    ]
