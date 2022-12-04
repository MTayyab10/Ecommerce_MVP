"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
import os
from datetime import timedelta
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-bbwaq(hl8x)e__!qjii+pgt)o@_p-pr&px+3+_vf@&7b3191(i'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    # local apps
    'accounts0',
    'category1',

    # DRF
    'rest_framework',

    # For Token-Authentication
    'rest_framework.authtoken',

    # For CORS, sharing API to other domains
    'corsheaders',

    # djoser for authentication
    'djoser',

    # for social auth
    'social_django',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# Added CORS (cross-origin resource sharing)
# it allows calling API in other domains/hosts

CORS_ALLOWED_ORIGINS = (
    'http://127.0.0.1:8000',
    'http://localhost:3000',  # for localhost (REACT Default)
    # 'http://192.168.10.45:3000',  # for network
)

# In Django 4.x versions

# CSRF_TRUSTED_ORIGINS = [
#     'http://127.0.0.1:8000',
#     'http://localhost:3000',
# ]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # whitenoise MW
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',

    # For CORS
    'corsheaders.middleware.CorsMiddleware',

    # For social auth
    'social_django.middleware.SocialAuthExceptionMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                # For social auth
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect'
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# DRF and Djoser settings

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# JWT Docs https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT',),

    # If in this period of time, user refresh page
    # he will remain login

    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),

    'AUTH_TOKEN_CLASSES': (
        'rest_framework_simplejwt.tokens.AccessToken',
    ),

    # 'ROTATE_REFRESH_TOKENS': False,
    # 'BLACKLIST_AFTER_ROTATION': False
}

# Djoser Docs https://djoser.readthedocs.io/en/latest/settings.html

DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,

    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,

    'SEND_CONFIRMATION_EMAIL': True,
    'SEND_ACTIVATION_EMAIL': True,
    'SEND_USERNAME_RETYPE': True,

    'USERNAME_RESET_CONFIRM_RETYPE': True,

    'SET_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',

    'ACTIVATION_URL': 'activate/{uid}/{token}',

    'LOGOUT_ON_PASSWORD_CHANGE': True,

    'SOCIAL_AUTH_TOKEN_STRATEGY': 'djoser.social.token.jwt.TokenStrategy',
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': ['http://localhost:8000/google',
                                          'http://localhost:8000/facebook'],

    'SERIALIZERS': {
        'user_create': 'accounts0.serializers.UserCreateSerializer',
        'user': 'accounts0.serializers.UserCreateSerializer',
        'current_user': 'accounts0.serializers.UserCreateSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
        # 'username_changed_confirmation': 'djoser.email.UsernameChangedConfirmationEmail',

    }
}

# For Social Auth

AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

# Google API Credentials
# https://python-social-auth.readthedocs.io/en/latest/backends/google.html#google-oauth2

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '372516173819-lj5okchl5eo35atglqchqimpt0ieqrh9.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = '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'
# OAuth2 Scope Docs https://developers.google.com/identity/protocols/oauth2/scopes#google-sign-in

SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ['https://www.googleapis.com/auth/userinfo.email',
                                   'https://www.googleapis.com/auth/userinfo.profile',
                                   'openid']
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = ['first_name', 'last_name']


# Facebook Credentials

SOCIAL_AUTH_FACEBOOK_KEY = '1001886573819190'
SOCIAL_AUTH_FACEBOOK_SECRET = '43fd2ef4d625e3bae83188bb5fc746f6'

SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']

SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
    'fields': 'email, first_name, last_name'
}

# For Custom User Model

AUTH_USER_MODEL = "accounts0.UserAccount"


# EMAIL Section - for Activation account & Reset Password

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'mt800045@gmail.com'
EMAIL_HOST_PASSWORD = 'pyphdfcstxkoyons'
EMAIL_USE_TLS = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = 'static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static')
]

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
