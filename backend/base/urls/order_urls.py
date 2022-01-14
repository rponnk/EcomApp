from django.urls import path
from base.views import order_views as views

urlpatterns = [
    # All defined in backend.urls with api/order/...
    path('add/', views.addOrderItems, name='orders-add'),
]