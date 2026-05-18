from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from jobs.models import Job
from .models import Application, SavedJob

@login_required
def apply_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)

    if request.method == 'POST':

        if Application.objects.filter(user=request.user, job=job).exists():
            messages.warning(request, "You already applied for this job ⚠️", extra_tags="jobdetails")
            return redirect('jobDetails', id=job_id)
        Application.objects.create(
            user=request.user,
            job=job,
            full_name=request.POST.get("full_name"),
            email=request.POST.get("email"),
            phone=request.POST.get("phone"),
            skills=request.POST.get("skills"),
            experience=request.POST.get("experience"),
            cv=request.FILES.get("cv"),
            cover_letter=request.POST.get('cover_letter', '')
        )

        messages.success(request, "Application submitted successfully ✅", extra_tags="apply")
        return redirect('my_applications')

    return render(request, 'applications/apply.html', {'job': job})

@login_required
def my_applications(request):
    applications = Application.objects.filter(
        user=request.user
    ).select_related('job').order_by('-applied_at')
    return render(request, 'applications/my_applications.html', {
        'applications': applications
    })


@login_required
def toggle_save_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    saved, created = SavedJob.objects.get_or_create(user=request.user, job=job)

    if not created:
        saved.delete()
        messages.info(request, "Removed from saved ❌", extra_tags="saved")
    else:
        messages.success(request, "Saved successfully ❤️", extra_tags="saved")

    return redirect('saved_jobs')


@login_required
def saved_jobs(request):
    saved = SavedJob.objects.filter(
        user=request.user
    ).select_related('job').order_by('-saved_at')
    return render(request, 'applications/saved_jobs.html', {
        'saved_jobs': saved
    })

