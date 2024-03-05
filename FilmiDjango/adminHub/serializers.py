from rest_framework import serializers
from .models import movie
from .models import BookingRecord
from django.contrib.auth import authenticate

class movieSerializer(serializers.ModelSerializer):
    class Meta:
        model = movie
        fields = '__all__'

class bookingSerializer(serializers.ModelSerializer):

    seatNumbers = serializers.IntegerField(default=0)

    class Meta:
        model = BookingRecord
        fields = '__all__'