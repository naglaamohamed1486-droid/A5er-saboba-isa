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
    applied_at = models.DateTimeField(auto_now_add=True)
    cover_letter = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'job')

    def __str__(self):
        return f"{self.user} - {self.job.title}"


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