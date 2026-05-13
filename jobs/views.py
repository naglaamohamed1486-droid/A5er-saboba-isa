from django.shortcuts import render,redirect
from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from applications.models import Application
import ast
from functools import wraps
from .models import Job
from .forms import JobForm
from applications.models import SavedJob


def admin_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        if request.user.role != 'admin':
            return redirect('search')
        return view_func(request, *args, **kwargs)
    return wrapper

def user_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        if request.user.role != 'user':
            return redirect('search')
        return view_func(request, *args, **kwargs)
    return wrapper



def search(request):
    query = request.GET.get('q')
    jobs = Job.objects.all()

    if query:
        jobs = jobs.filter(title__icontains=query)

    saved_ids = []
    if request.user.is_authenticated:
        saved_ids = SavedJob.objects.filter(user=request.user)\
                        .values_list('job_id', flat=True)

    # 👇 أضيفي ده
    compare_ids = list(map(int, request.session.get('compare_list', [])))

    return render(request, 'jobs/search.html', {
        'jobs': jobs,
        'saved_ids': saved_ids,
        'compare_ids': compare_ids  # 👈 ده المهم
    })
   

    

@admin_required
def add_jobs(request):    
    if request.method == "POST":
        form = JobForm(request.POST)
        if form.is_valid():
            job = form.save(commit=False)
            job.employer = request.user
            job.save()

            messages.success(request, "Job added successfully ✅")
            return redirect('job_list')
        else:
            print(form.errors)
    else:
        form = JobForm()

    return render(request, 'jobs/addjob.html', {'form': form})

#naglaa
@admin_required
def dashboard(request):
    jobs = Job.objects.filter(employer=request.user)
    applications = Application.objects.filter(
        job__employer=request.user
    ).select_related('job', 'user').order_by('-applied_at')

    return render(request, 'jobs/dashboard.html', {
        'jobs': jobs,
        'total_jobs': jobs.count(),
        'applications': applications,
        'total_applications': applications.count(),
    })


@admin_required
def job_list(request):
    jobs = Job.objects.filter(employer=request.user)

    return render(request, 'jobs/joblist.html', {
        'jobs': jobs,
        'total_jobs': jobs.count()
    })


@admin_required
def delete_job(request, id):
    job = get_object_or_404(Job, id=id, employer=request.user)
    job.delete()
    return redirect('job_list')
@admin_required
def edit_job(request, id):
    job = get_object_or_404(Job, id=id, employer=request.user)

    if request.method == "POST":
        job.cover = request.POST.get("cover")
        job.title = request.POST.get("title")
        job.company = request.POST.get("company")
        job.location = request.POST.get("location")
        job.time = request.POST.get("time")
        job.salary = request.POST.get("salary")
        job.type = request.POST.get("type")
        job.exp = request.POST.get("exp")
        job.description = request.POST.get("description")
        job.companyLocation = request.POST.get("companyLocation")
        job.employees = request.POST.get("employees")

        job.tags = ast.literal_eval(request.POST.get("tags"))
        job.required = ast.literal_eval(request.POST.get("required"))
        job.benefit = ast.literal_eval(request.POST.get("benefit"))
        job.gallery = ast.literal_eval(request.POST.get("gallery"))

        job.save()
        return redirect("job_list")

    return render(request, "jobs/editjob.html", {"job": job})

@admin_required
def admin_applications(request):
    applications = Application.objects.filter(
        job__employer=request.user
    ).select_related('job', 'user').order_by('-applied_at')

    return render(request, 'jobs/adminapply.html', {
        'applications': applications
    })

@admin_required
def update_application_status(request, app_id, status):
    application = get_object_or_404(
        Application,
        id=app_id,
        job__employer=request.user
    )

    if status in ['accepted', 'rejected', 'pending']:
        application.status = status
        application.save()

    return redirect('admin_applications')


#habiba
@user_required
def jobDetails(request, id):
    job = get_object_or_404(Job, id=id)
    return render(request, 'jobs/jobDetails.html', {'job': job})


@admin_required
def adminDetails(request, id):
    job = get_object_or_404(Job, id=id)
    return render(request, 'jobs/adminDetails.html', {'job': job})

# تأكدي إن السطر اللي تحت def واخد مسافة لليمين
@user_required
@user_required
def compare_view(request, id):
    compare_list = request.session.get('compare_list', [])

    # toggle
    if id in compare_list:
        compare_list.remove(id)
    else:
        if len(compare_list) < 2:
            compare_list.append(id)

    request.session['compare_list'] = compare_list

    
    if len(compare_list) == 2:
        return redirect('compare_page')

    return redirect('search')  




@user_required
def applied_jobs_view(request):
    if Application.objects.filter(user=request.user, job=job).exists():
        messages.warning(request, "You already applied for this job!")
        return redirect('jobDetails')  # أو jobDetails لو عايزة
    # هنا هتجيبي الوظائف اللي المستخدم قدم عليها
    return render(request, 'jobs/AppliedJobs.html')

def cancel_application(request, id):
    app = get_object_or_404(Application, id=id, user=request.user)
    app.delete()
    return redirect('my_applications')

@user_required
def compare_page(request):
    compare_list = request.session.get('compare_list', [])
    jobs = Job.objects.filter(id__in=compare_list)

    return render(request, 'jobs/compare.html', {
        'jobs': jobs
    
    })                                                                                                                                                                                                                                           