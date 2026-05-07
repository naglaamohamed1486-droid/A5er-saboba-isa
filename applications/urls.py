from django.urls import path
from . import views

urlpatterns = [
    path('apply/<int:job_id>/', views.apply_job, name='apply_job'),
    path('my-applications/', views.my_applications, name='my_applications'),
    path('save/<int:job_id>/', views.toggle_save_job, name='toggle_save_job'),
    path('saved-jobs/', views.saved_jobs, name='saved_jobs'),
]