# Generated by Django 5.0.1 on 2024-03-07 02:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminHub', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookingregister',
            name='bookingQR',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='movieEndDate',
            field=models.DateField(default=datetime.datetime(2024, 4, 6, 8, 18, 8, 780964)),
        ),
    ]