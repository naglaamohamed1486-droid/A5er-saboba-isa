from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [('user', 'User'), ('admin', 'Admin')]
    
    role     = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    age      = models.IntegerField(null=True, blank=True)
    gender   = models.CharField(max_length=10, blank=True)
    company  = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=200, blank=True)
    skills   = models.TextField(blank=True)