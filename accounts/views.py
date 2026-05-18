import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render,redirect
from .models import User


def signup_view(request):
    if request.method == 'GET':
        return render(request, 'accounts/signup.html')

    data     = json.loads(request.body)
    username = data.get('username', '').strip()
    email    = data.get('email', '').strip()
    password = data.get('password', '')
    confirm  = data.get('confirm_password', '')
    role     = data.get('role', 'user')
    age      = data.get('age')
    gender   = data.get('gender', '')
    company  = data.get('company', '')

    if not username or not email or not password:
        return JsonResponse({'error': 'All fields are required'}, status=400)
    if password != confirm:
        return JsonResponse({'error': 'Passwords do not match'}, status=400)
    if User.objects.filter(email=email).exists():
        return JsonResponse({'error': 'Email already exists'}, status=400)
    if User.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username already taken'}, status=400)
    if age and (int(age) < 16 or int(age) > 100):
        return JsonResponse({'error': 'Enter a valid age'}, status=400)
    if role == 'admin' and not company:
        return JsonResponse({'error': 'Company name is required for admins'}, status=400)

    user = User.objects.create_user(
        username=username, email=email, password=password,
        role=role, age=age, gender=gender, company=company
    )
    login(request, user)
    return JsonResponse({'message': 'Account created', 'role': user.role, 'username': user.username})


def login_view(request):
    if request.method == 'GET':
        return render(request, 'accounts/login.html')

    data     = json.loads(request.body)
    email    = data.get('email', '').strip()
    password = data.get('password', '')

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=400)

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'error': 'Email not found'}, status=404)

    user = authenticate(request, username=user_obj.username, password=password)
    if user is None:
        return JsonResponse({'error': 'Incorrect password'}, status=401)

    login(request, user)
    return JsonResponse({'message': 'Logged in', 'role': user.role, 'username': user.username})


def logout_view(request):
    logout(request)
    return redirect('/')


@login_required
def profile_view(request):
    if request.method == 'GET':
        return render(request, 'accounts/profile.html')

    data     = json.loads(request.body)
    user     = request.user
    username = data.get('username', '').strip()
    age      = data.get('age')
    gender   = data.get('gender', '')
    location = data.get('location', '')

    if not username:
        return JsonResponse({'error': 'Username is required'}, status=400)
    if age and (int(age) < 16 or int(age) > 100):
        return JsonResponse({'error': 'Enter a valid age'}, status=400)

    user.username = username
    user.age      = age
    user.gender   = gender
    user.location = location
    user.skills   = data.get('skills', '')
    user.save()
    return JsonResponse({'message': 'Profile updated'})


def me_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'logged_in': False})
    u = request.user
    return JsonResponse({
        'logged_in'          : True,
        'username'           : u.username,
        'email'              : u.email,
        'role'               : u.role,
        'age'                : u.age,
        'gender'             : u.gender,
        'company'            : u.company,
        'location'           : u.location,
        'skills'             : u.skills,
        'applied_count'      : u.applications.count() if hasattr(u, 'applications') else 0,
        'saved_count'        : u.saved_jobs.count() if hasattr(u, 'saved_jobs') else 0,
        'jobs_count'         : u.posted_jobs.count() if hasattr(u, 'posted_jobs') else 0,
        'applications_count' : u.posted_jobs.aggregate(total=__import__('django.db.models', fromlist=['Sum']).Sum('applications__id'))['total'] or 0 if hasattr(u, 'posted_jobs') else 0,
    })