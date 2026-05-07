from django.shortcuts import render
from .models import Job
from .forms import JobForm

def job_list(request):
    jobs = Job.objects.all()
    return render(request, 'jobs/job_list.html', {'jobs': jobs})


def search_jobs(request):
    query = request.GET.get('q')

    if query:
        jobs = Job.objects.filter(title__icontains=query)
    else:
        jobs = Job.objects.all()

    return render(request, 'jobs/search.html', {'jobs': jobs})

def add_jobs(request):
    form = JobForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('dashboard')
    return render(request, 'jobs/addjob.html', {'form': form})