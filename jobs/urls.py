from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search, name='search'),
    path('joblist/', views.job_list, name='job_list'),
    path('job/<int:id>/', views.jobDetails, name='jobDetails'),
    path('add/', views.add_jobs, name='add_jobs'),
    path('admin-job/<int:id>/', views.adminDetails, name='adminDetails'),
   #naglaa
   path('dashboard/', views.dashboard, name='dashboard'),
   path('delete-job/<int:id>/', views.delete_job, name='delete_job'),
   path('edit/<int:id>/', views.edit_job, name='edit_job'),
   path('compare/<int:id>/', views.compare_view, name='compare'),
   path('compare/', views.compare_page, name='compare_page'),

   path('applied-jobs/', views.applied_jobs_view, name='applied_jobs'),
   path('applications/', views.admin_applications, name='admin_applications'),
   path('applications/<int:app_id>/<str:status>/', views.update_application_status, name='update_application_status'),
   #habiba
   #yarab n3eesh
   #yarab n3eesh tany
]