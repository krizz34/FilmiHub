# Generated by Django 5.0.1 on 2024-03-14 07:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminHub', '0003_bookingregister_bookingpdf_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='movieImage',
            field=models.URLField(default='https://1.bp.blogspot.com/-ftB4Pd-AMwk/URPtZ026OnI/AAAAAAAAAds/wFJ4C-u2HTY/s1600/swades_xlg.jpg'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='movieEndDate',
            field=models.DateField(default=datetime.datetime(2024, 4, 13, 13, 5, 32, 855128)),
        ),
    ]