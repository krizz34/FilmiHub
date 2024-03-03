from django.urls import path, include
from . import views

urlpatterns = [
    path('APIsignup/', views.apiSignup, name='APIsignUp'),
    path('APIlogin/', views.apiLogin, name='APIlogin'),
    path('APIlogout/', views.apiLogout, name='APIlogout'),
    path('APIcreate/', views.apiCreate, name='APIcreate'),
    path('APIread/', views.apiRead, name='APIread'),
    path('APIreadspecial/<int:pk>/', views.apiReadSpecial, name='APIreadspecial'),
    path('APIupdate/<int:pk>/', views.apiUpdate, name='APIupdate'),
    path('APIdelete/<int:pk>/', views.apiDelete, name='APIdelete'),
    path('APIsearch/<str:movieName>/', views.apiSearch, name='APIsearch'),
    path('APIadminRead/', views.apiAdminRead, name='APIadminRead'),



]
