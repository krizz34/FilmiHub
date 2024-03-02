from django.db import models
from datetime import datetime, timedelta

class movie(models.Model):
    movieName = models.CharField(max_length=100)
    movieDesc = models.TextField(max_length=1200)
    movieGenre = models.TextField(max_length=200)
    movieCost = models.DecimalField(max_digits=10, decimal_places=2)
    movieTime = models.CharField(max_length=10, choices=[
        ('11:30 am', '11:30 am'),
        ('2:30 pm', '2:30 pm'),
        ('5:00 pm', '5:00 pm'),
        ('9:00 pm', '9:00 pm'),
    ])
    movieFromDate = models.DateField()
    movieEndDate = models.DateField(default=datetime.now() + timedelta(days=30))
