# Generated by Django 5.0.1 on 2024-03-05 17:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminHub', '0007_alter_bookingrecord_bookingtime_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='movieEndDate',
            field=models.DateField(default=datetime.datetime(2024, 4, 4, 23, 7, 4, 110508)),
        ),
        migrations.DeleteModel(
            name='BookingDetails',
        ),
    ]