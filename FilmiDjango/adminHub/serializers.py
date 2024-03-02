from rest_framework import serializers
from .models import movie
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# class signupSerializer(serializers.ModelSerializer):
#     passwordConf = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ['email', 'password', 'passwordConf']

#     def validate(self, data):
#         if data['password'] != data['passwordConf']:
#             raise serializers.ValidationError("Passwords do not match.")
#         return data

#     def create(self, validated_data):
#         # Include 'username' in the creation process, you can modify this logic based on your requirements
#         username = validated_data['email'].split('@')[0]
#         user = User.objects.create_user(
#             username=username,  # You need to provide a username here
#             email=validated_data['email'],
#             password=validated_data['password']
#         )
#         return user

# class loginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()

#     def validate(self, data):
#         email = data.get('email')
#         password = data.get('password')

#         if email and password:
#             user = authenticate(username=email, password=password)

#             if not user:
#                 raise serializers.ValidationError("Invalid email or password. Please try again.")
#         else:
#             raise serializers.ValidationError("Must include both email and password in the request.")

#         data['user'] = user
#         return data

class movieSerializer(serializers.ModelSerializer):
    class Meta:
        model = movie
        fields = '__all__'
