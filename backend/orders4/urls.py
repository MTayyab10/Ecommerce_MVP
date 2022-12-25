from django.urls import path
from .views import ListOrdersView, ListOrderDetailView,\
    GetTotalPriceView, CreateOrderView

urlpatterns = [
    path('get-total-price', GetTotalPriceView.as_view()),
    path('create-order', CreateOrderView.as_view()),

    path('get-orders', ListOrdersView.as_view()),
    path('get-order/<transactionId>', ListOrderDetailView.as_view()),
]