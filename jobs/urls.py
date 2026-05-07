from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search, name='search'),
    path('joblist/', views.job_list, name='job_list'),
    path('job/<int:id>/', views.jobDetails, name='jobDetails'),
    path('add/', views.add_jobs, name='add_jobs'),

   #naglaa
   path('dashboard/', views.dashboard, name='dashboard'),
   path('delete-job/<int:id>/', views.delete_job, name='delete_job'),

   #habiba
   #yarab n3eesh
   #yarab n3eesh tany
]