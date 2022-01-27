from django.urls import path
from base.views import order_views as views

urlpatterns = [
    # All defined in backend.urls with api/orders/...
    path('', views.getOrders, name='all-orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='my-orders'),
    
    path('<str:pk>/', views.getOrderById, name='order-by-id'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='paid'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='delivered'),
    
]