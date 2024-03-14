from django import forms
from .models import movie

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class movieForm(forms.ModelForm):
    class Meta:
        model = movie
        fields = ['movieName', 'movieDesc', 'movieGenre', 'movieCost','movieImage', 'movieTime', 'movieFromDate', 'movieEndDate']

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
