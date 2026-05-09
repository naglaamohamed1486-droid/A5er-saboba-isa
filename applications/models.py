from django.db import models

# Create your models here.

from django.conf import settings
from jobs.models import Job

class Application(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='applications'
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name='applications'
    )
    STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('accepted', 'Accepted'),
    ('rejected', 'Rejected'),
    ]

    status = models.CharField(
    max_length=20,
    choices=STATUS_CHOICES,
    default='pending'
    )
    full_name = models.CharField(max_length=120 ,blank=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=30, blank=True)
    skills = models.TextField(blank=True)
    experience = models.CharField(max_length=100,blank=True)
    cv = models.FileField(upload_to="cvs/",blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)
    cover_letter = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'job')

    def __str__(self):
        return f"{self.user} applied to {self.job.title}"


class SavedJob(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='saved_jobs'
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name='saved_by'
    )
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'job')

    def __str__(self):
        return f"{self.user} saved {self.job.title}"