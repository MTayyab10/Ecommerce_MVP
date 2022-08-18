from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()


class UserAdmin(admin.ModelAdmin):

    list_display = ('id',
                    'first_name', 'last_name',
                    'email')
    # list_display_links = ('id', 'name', 'email', )
    # search_fields = ('email',
    #                   'name' )

    list_per_page = 25

    list_filter = ('is_superuser', 'is_active')


admin.site.register(User, UserAdmin)
