# This file contains views for user registration and authentication using Django REST Framework.
# We use Django's built-in User model for simplicity and security.

from rest_framework import generics  # Provides generic views for common CRUD operations
from django.contrib.auth.models import User  # Django's built-in user model
from rest_framework.response import Response  # Used to send HTTP responses
from rest_framework import status  # HTTP status codes
from rest_framework.permissions import AllowAny  # Allows any user to access the view (no authentication required)
from rest_framework.serializers import ModelSerializer, ValidationError  # Tools for serializing data and handling validation errors

# Serializer for user registration
# Serializers convert complex data (like Django models) to Python data types that can be rendered into JSON
class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User  # Use Django's built-in User model
        fields = ('username', 'password', 'email')  # Fields required for registration
        extra_kwargs = {'password': {'write_only': True}}  # Password should not be readable in API responses

    # Custom create method to handle user creation and duplicate checks
    def create(self, validated_data): 
        # Check if username already exists
        if User.objects.filter(username=validated_data['username']).exists():
            raise ValidationError({'message': 'A user with that username already exists.'})
        # Check if email already exists
        if validated_data.get('email') and User.objects.filter(email=validated_data['email']).exists():
            raise ValidationError({'message': 'A user with that email already exists.'})
        # Create the user using Django's built-in method (handles password hashing)
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        return user

# API view for user registration
# Uses Django REST Framework's generic CreateAPIView for simplicity
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()  # Queryset for all users (required by DRF)
    permission_classes = (AllowAny,)  # Allow anyone to register
    serializer_class = RegisterSerializer  # Use our custom serializer

    # Custom create method to handle registration and error responses
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)  # Validate input data
            self.perform_create(serializer)  # Create the user
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            # Return error message if registration fails (e.g. duplicate username/email)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
