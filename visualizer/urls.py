from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path("", views.home, name="home"),
    path('<str:tid>', views.ticker, name='ticker'),
    path('request_denied/', views.ticker_request_denied, name='ticker_request_denied'),
    path('ticker_invalid/', views.ticker_invalid, name='ticker_invalid'),
    path('about/', views.about, name='about'),
]

urlpatterns += staticfiles_urlpatterns()
