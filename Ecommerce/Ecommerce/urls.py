from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.authtoken')),
    path('api/v1/', include('product.urls')),
    path('api/v1/', include('cart.urls')),
    # path('', TemplateView.as_view(template_name='home.html'))
    path('',include('frontend.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
