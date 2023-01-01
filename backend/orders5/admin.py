from django.contrib import admin
from .models import Order, OrderItem


class OrderAdmin(admin.ModelAdmin):
    # def has_delete_permission(self, request, obj=None):
    #     return False

    list_display = ('id', 'user',
                    'unique_id', # 'amount', 'status',
                    'shop_detail', 'order_item_details',
                    # 'created_date'
                    )
    list_display_links = ('id', 'user',  'unique_id')
    # list_filter = ('status', )
    # list_editable = ('status', )
    list_per_page = 25
    search_fields = ('unique_id', )


admin.site.register(Order, OrderAdmin)


class OrderItemAdmin(admin.ModelAdmin):
    # def has_delete_permission(self, request, obj=None):
    #     return False

    list_display = ('order', 'id', 'name', 'price',
                    'count', 'order_item_details'
                    )
    list_display_links = ('order', 'id', 'name', )
    list_per_page = 25


admin.site.register(OrderItem, OrderItemAdmin)
