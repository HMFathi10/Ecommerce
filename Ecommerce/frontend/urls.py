from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('<slug:category_slug>/<slug:product_slug>/', views.Product),
    path('cart/', views.index),
    path('checkout/', views.index),
]
