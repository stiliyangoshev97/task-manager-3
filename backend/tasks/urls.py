# This file defines the API endpoints for task CRUD operations
# Each endpoint maps a URL to a view

from django.urls import path  # Used to define URL patterns
from . import views  # Import our task views

urlpatterns = [
    # Endpoint for listing and creating tasks (GET, POST)
    path('', views.TaskListCreateView.as_view(), name='task-list-create'),
    # Endpoint for retrieving, updating, and deleting a single task (GET, PUT, DELETE)
    path('<int:pk>/', views.TaskRetrieveUpdateDestroyView.as_view(), name='task-detail'),
]
