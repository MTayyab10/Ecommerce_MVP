# Generated by Django 4.1.4 on 2023-01-01 05:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('delivery_address4', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='deliveryaddress',
            old_name='full_name',
            new_name='name',
        ),
    ]
