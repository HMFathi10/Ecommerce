from re import template
from django.urls import path, include
from . import views

urlpatterns = [
    path('latest-carts/',
         views.ListestCartList.as_view()),
    path('latest-carts/<int:userId>/',
         views.CartDetail.as_view()),
    path('latest-cartitems/',
         views.ListestCartItemsList.as_view()),
    path('latest-cartitems/<int:cart>/',
         views.CartItemsDetail.as_view()),
    path('latest-cartitemsmaintainable/<int:pk>/',
         views.CartItemsMaintainable.as_view()),
]
