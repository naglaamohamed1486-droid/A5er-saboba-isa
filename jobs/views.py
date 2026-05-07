from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from .models import Job
from .forms import JobForm

def job_list(request):
    jobs = Job.objects.all()
    return render(request, 'jobs/job_list.html', {'jobs': jobs})


def search(request):
    jobs = Job.objects.all()

    q = request.GET.get('q')
    location = request.GET.get('location')
    job_type = request.GET.get('type')
    tags = request.GET.get('tags')

    if q:
        jobs = jobs.filter(title__icontains=q)

    if location and location != "All Locations":
        jobs = jobs.filter(location__icontains=location)

    if job_type and job_type != "All Types":
        jobs = jobs.filter(type__icontains=job_type)

    if tags and tags != "All-Tags":
        jobs = jobs.filter(tags__icontains=tags)

    return render(request, 'jobs/search.html', {'jobs': jobs})

def add_jobs(request):
    if request.method == "POST":
        form = JobForm(request.POST)
        if form.is_valid():
            job = form.save(commit=False)
            job.employer = request.user
            job.save()

            messages.success(request, "Job added successfully ✅")
            return redirect('add_jobs')
        else:
            print(form.errors)
    else:
        form = JobForm()

    return render(request, 'jobs/addjob.html', {'form': form})

#naglaa

def dashboard(request):
    jobs = Job.objects.filter(employer=request.user)

    total_applications = 0  # مؤقت

    return render(request, 'jobs/dashboard.html', {
        'jobs': jobs,
        'total_jobs': jobs.count(),
        'total_applications': total_applications,
    })

def job_list(request):
    jobs = Job.objects.filter(employer=request.user)

    return render(request, 'jobs/joblist.html', {
        'jobs': jobs,
        'total_jobs': jobs.count()
    })

def delete_job(request, id):
    job = get_object_or_404(Job, id=id, employer=request.user)
    job.delete()
    return redirect('job_list')

#habiba

def jobDetails(request, id):
    job = get_object_or_404(Job, id=id)
    return render(request, 'jobs/jobDetails.html', {'job': job})