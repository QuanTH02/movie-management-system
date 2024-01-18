# Generated by Django 5.0.1 on 2024-01-18 20:39

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App_Film_BE', '0002_ratingfilm_delete_rating'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FollowFilmUser',
            fields=[
                ('follow_id', models.AutoField(primary_key=True, serialize=False)),
                ('total_view', models.IntegerField(default=0)),
                ('movie_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='App_Film_BE.movieinformation')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'follow_film_user',
            },
        ),
    ]