from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()


# Header Name

admin.site.site_header = "E-Commerce Admin"

# Apps Ordering in DjangoAdmin


def app_resort(func):
    def inner(*args, **kwargs):
        app_list = func(*args, **kwargs)
        # Useful to discover your app and module list:
        # import pprint
        # pprint.pprint(app_list)

        app_sort_key = 'name'
        app_ordering = {
            "Authentication and Authorization": 0,
            "Accounts0": 1,
            "Auth Token": 2,
            "Home1": 3,
            # "Shops2": 4,
            # "Products3": 4,
            # "Orders4": 5,
            # "Jobs8": 7,
            # "Delivery_Address5": 6,
            # "Accounts4": 5,

            # "Jobs8": 3,
        }

        resorted_app_list = sorted(app_list, key=lambda x: app_ordering[x[app_sort_key]] if x[
                                                                                                app_sort_key] in app_ordering else 1000)

        model_sort_key = 'object_name'
        model_ordering = {
            # "Customer": 1,
            # "Category": 2,
            # "Shop": 3,
            # "Product": 4,

            "Order": 1,
            "OrderItems": 2,

            "Team": 1,
            "WorkForce": 2,
            "Location": 3,
            "Job": 4,
            "JobApplication": 5,
        }

        for app in resorted_app_list:
            app['models'].sort(
                key=lambda x: model_ordering[x[model_sort_key]] if x[model_sort_key] in model_ordering else 1000)
        return resorted_app_list

    return inner


admin.site.get_app_list = app_resort(admin.site.get_app_list)

# User Admin


class UserAdmin(admin.ModelAdmin):

    list_display = ('id',
                    'first_name', 'last_name',
                    'email', 'date_joined')
    # list_display_links = ('id', 'name', 'email', )
    # search_fields = ('email',
    #                   'name' )

    list_per_page = 25

    list_filter = ('is_superuser', 'is_active')


admin.site.register(User, UserAdmin)
