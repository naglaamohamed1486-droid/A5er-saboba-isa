from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_jobs, name='search_jobs'),
    path('joblist/', views.job_list, name='job_list'),
   
]