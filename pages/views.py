from django.shortcuts import render, redirect
from .models import ContactMessage
def home(request):
    return render(request, 'pages/index.html')

def about(request):
    return render(request, 'pages/about.html')

def thank_you(request):
    return render(request, "pages/thank-you.html")

def contact(request):
    if request.method == "POST":
        ContactMessage.objects.create(
            user=request.user if request.user.is_authenticated else None,
            full_name=request.POST.get("full_name"),
            email=request.POST.get("email"),
            message=request.POST.get("message"),
        )
        return redirect('thank_you')

    return render(request, 'pages/contact.html')