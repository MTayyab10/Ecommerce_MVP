from django.db import models
from django.contrib.auth.models import AbstractBaseUser, \
    PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):

    # def create_user(self, name, email, password=None):
    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        # user = self.model(name=name, email=email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()
        return user

    # def create_superuser(self, email, name, password):
    def create_superuser(self, email, password, **extra_fields):

        # user = self.create_user(email, email, password)
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True

        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=200, unique=True)

    # name = models.CharField(max_length=70, unique=True)
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)

    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name
        # return self.name

    def get_short_name(self):
        return self.last_name
        # return self.name

    def __str__(self):
        return self.email
