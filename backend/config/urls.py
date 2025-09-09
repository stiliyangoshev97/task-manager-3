"""
URL configuration for config project.

This file defines the main URL routes for your Django project:
- /admin/: Django admin site
- /api/auth/: Authentication endpoints (register, login, refresh)
- /api/tasks/: Task CRUD endpoints

We use Django's 'include' function to connect app-specific URLs to the main project.
"""
from django.contrib import admin  # Django admin site
from django.urls import path, include  # Tools for defining and including URLs

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site for managing users and tasks
    path('api/auth/', include('accounts.urls')),  # Authentication endpoints
    path('api/tasks/', include('tasks.urls')),    # Task CRUD endpoints
]
