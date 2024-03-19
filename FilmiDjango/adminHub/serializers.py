from rest_framework import serializers
from .models import movie
from .models import BookingRegister
from django.contrib.auth import authenticate

class movieSerializer(serializers.ModelSerializer):
    class Meta:
        model = movie
        fields = '__all__'

class bookingSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = BookingRegister
        fields = ['id', 'bookingDate', 'bookingTime', 'noOfBookings', 'seatNumbers','user','movie', 'bookingQR', 'bookingPDF','username']