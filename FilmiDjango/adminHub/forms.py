from django import forms
from .models import movie

class movieForm(forms.ModelForm):
    class Meta:
        model = movie
        fields = ['movieName', 'movieDesc', 'movieGenre', 'movieCost', 'movieTime', 'movieFromDate', 'movieEndDate']
