from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from .models import Job
from .forms import JobForm

def job_list(request):
    jobs = Job.objects.all()
    return render(request, 'jobs/job_list.html', {'jobs': jobs})


def search(request):
    query = request.GET.get('q')

    jobs = Job.objects.all()  # دا الأساس

    if query:
        jobs = jobs.filter(title__icontains=query)

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