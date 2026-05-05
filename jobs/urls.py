from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_jobs, name='search_jobs'),
   
   
    path('details/<int:id>/', views.job_details, name='job_details'),
    path('saved/', views.saved_jobs, name='saved_jobs'),
    path('applied/', views.applied_jobs, name='applied_jobs'),
    path('compare/', views.compare_jobs, name='compare_jobs'),
    path('dashboard/', views.dashboard, name='dashboard'),
   
   path('joblist/', views.job_list, name='job_list'),
]