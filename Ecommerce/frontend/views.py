from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'frontend/index.html')


def Product(request, category_slug, product_slug):
    return render(request, 'frontend/index.html')
