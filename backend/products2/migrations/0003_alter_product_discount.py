# Generated by Django 4.1.4 on 2023-01-01 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products2', '0002_alter_product_img_alter_product_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='discount',
            field=models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=5, null=True),
        ),
    ]