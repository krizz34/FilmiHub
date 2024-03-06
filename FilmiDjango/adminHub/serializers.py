from rest_framework import serializers
from .models import movie
from .models import BookingRegister
from django.contrib.auth import authenticate

class movieSerializer(serializers.ModelSerializer):
    class Meta:
        model = movie
        fields = '__all__'

class bookingSerializer(serializers.ModelSerializer):

    seatNumbers = serializers.CharField(max_length=200)

    class Meta:
        model = BookingRegister
        fields = '__all__'