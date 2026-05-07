from django.db import models

class Job(models.Model):
    cover = models.URLField()
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    time = models.CharField(max_length=100)

    tags = models.JSONField()
    salary = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    exp = models.CharField(max_length=100)

    description = models.TextField()
    required = models.JSONField()
    benefit = models.JSONField()
    gallery = models.JSONField()

    companyLocation = models.CharField(max_length=200)
    employees = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    

    #naglaa



    #habiba