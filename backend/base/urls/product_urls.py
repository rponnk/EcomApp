from django.urls import path
from base.views import product_views as views

urlpatterns = [
    # All defined in backend.urls
    path('', views.getProducts, name='products'),
    path('<str:pk>', views.getProduct, name='product'),
]