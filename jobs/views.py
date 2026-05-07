from django.shortcuts import render, redirect
from django.contrib import messages
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
    if request.method == "POST":
        form = JobForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Job added successfully ✅")
            return redirect('add_jobs')
        else:
            print(form.errors)
    else:
        form = JobForm()

    return render(request, 'jobs/addjob.html', {'form': form})
   
#naglaa



#habiba