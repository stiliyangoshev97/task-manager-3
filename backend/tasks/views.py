# This file contains views for task CRUD operations using Django REST Framework
# Views handle HTTP requests and return responses (JSON)

from django.shortcuts import render  # Not used here, but imported by default
from rest_framework import generics, permissions  # DRF generic views and permission classes
from .models import Task  # Import the Task model
from .serializers import TaskSerializer  # Import the Task serializer

# View for listing and creating tasks
# ListCreateAPIView provides GET (list) and POST (create) methods
class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer  # Use our TaskSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access

    def get_queryset(self):
        # Only return tasks owned by the current user
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Set the owner of the task to the current user
        serializer.save(owner=self.request.user)

# View for retrieving, updating, and deleting a single task
# RetrieveUpdateDestroyAPIView provides GET, PUT, DELETE methods
class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer  # Use our TaskSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access

    def get_queryset(self):
        # Only allow users to access their own tasks
        return Task.objects.filter(owner=self.request.user)
