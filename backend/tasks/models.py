# This file defines the Task model for the task manager app
# Models represent tables in the database and define the structure of your data

from django.db import models  # Django's ORM for database models
from django.contrib.auth.models import User  # Reference to the user who owns the task

class Task(models.Model):
    # Title of the task (required)
    title = models.CharField(max_length=255)
    # Description of the task (optional)
    description = models.TextField(blank=True)
    # Whether the task is completed
    completed = models.BooleanField(default=False)
    # Reference to the user who owns the task
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    # Timestamp when the task was created
    created_at = models.DateTimeField(auto_now_add=True)
    # Timestamp when the task was last updated
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # String representation of the task (useful in Django admin)
        return self.title
