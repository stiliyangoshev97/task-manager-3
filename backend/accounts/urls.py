# This file defines the API endpoints for authentication (login, register, token refresh)
# We use Django REST Framework SimpleJWT for JWT authentication

from django.urls import path  # Used to define URL patterns
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # View for obtaining JWT tokens (login)
    TokenRefreshView,     # View for refreshing JWT tokens
)
from . import views  # Import our custom registration view

urlpatterns = [
    # Endpoint for user login (returns JWT access and refresh tokens)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Endpoint for refreshing JWT token
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Endpoint for user registration
    path('register/', views.RegisterView.as_view(), name='register'),
]
