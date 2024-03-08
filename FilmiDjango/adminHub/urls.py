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
    path('APIcreatebooking/<int:movie_id>/', views.apiCreateBooking, name='apiCreateBooking'),
    path('APIcheckavailability/<str:bookingDate>/<str:bookingTime>/', views.apiCheckAvailability, name='apiCheckAvailability'),
    path('APIreadbookings/', views.apiBookingRead, name='apiBookingRead'),
    path('APIreadbookingsspecial/<int:pk>/', views.apiBookingReadSpecial, name='APIreadbookingsspecial'),
    path('new-order/', views.new_order, name='razorpay_neworder'),
    path('callback/', views.order_callback, name='razorpay_callback'),



]
