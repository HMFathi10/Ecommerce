from re import template
from django.urls import path, include
from . import views

urlpatterns = [
    path('latest-products/',
         views.LatestProductsList.as_view()),
    path('latest-products/<slug:category_slug>/<slug:product_slug>/',
         views.ProductDetail.as_view()),
]
