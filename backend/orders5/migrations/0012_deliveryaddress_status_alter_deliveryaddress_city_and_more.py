# Generated by Django 4.1.4 on 2022-12-27 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders5', '0011_alter_order_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='deliveryaddress',
            name='status',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='deliveryaddress',
            name='city',
            field=models.CharField(default='Tatlay Aali', max_length=255),
        ),
        migrations.AlterField(
            model_name='order',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=9),
        ),
    ]
