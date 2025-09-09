"""
Django settings for config project.

This file contains all configuration for your Django project, including:
- Installed apps (accounts, tasks, etc.)
- Middleware (security, CORS, sessions)
- Database settings (SQLite)
- REST framework and JWT settings
- Static files and internationalization

You rarely need to change most settings except for:
- SECRET_KEY: Keep this secret in production!
- DEBUG: Set to False in production
- ALLOWED_HOSTS: Add your domain in production
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-%nyc1ueryeh7v&fb^t_)&qm+lw#_ft2we&wbyq46abkag6f2q6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []  # Add your domain here in production

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',  # Django admin site
    'django.contrib.auth',  # Authentication system
    'django.contrib.contenttypes',  # Content type system
    'django.contrib.sessions',  # Session framework
    'django.contrib.messages',  # Messaging framework
    'django.contrib.staticfiles',  # Static file management
    'rest_framework',  # Django REST Framework for APIs
    'corsheaders',  # CORS support for frontend-backend communication
    'accounts',  # Custom app for authentication
    'tasks',  # Custom app for task management
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Enable CORS for frontend
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # Use SQLite for development
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # Use JWT for authentication
    ),
}

# Allow all CORS origins for development
CORS_ALLOW_ALL_ORIGINS = True
