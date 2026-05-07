from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_jobs, name='search_jobs'),
    path('joblist/', views.job_list, name='job_list'),
    path('add/', views.add_jobs, name='add_jobs')
   #naglaa


   
   #habiba
   #yarab n3eesh
   #yarab n3eesh tany
]