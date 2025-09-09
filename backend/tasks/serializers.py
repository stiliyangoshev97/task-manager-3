# This file defines serializers for the Task model
# Serializers convert model instances to JSON for API responses and validate incoming data

from rest_framework import serializers  # DRF's serializer tools
from .models import Task  # Import the Task model

class TaskSerializer(serializers.ModelSerializer):
    # Meta class tells DRF which model and fields to use
    class Meta:
        model = Task  # Use the Task model
        fields = ['id', 'title', 'description', 'completed', 'owner', 'created_at', 'updated_at']  # Fields to expose in the API
        read_only_fields = ['owner', 'created_at', 'updated_at']  # These fields can't be changed via API
