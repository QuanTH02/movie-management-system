#!/usr/bin/env python
import os
import django
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Film_BE.settings')
django.setup()

from django.contrib.auth.models import User

username = os.environ.get('ADMIN_USERNAME', 'admin')
email = os.environ.get('ADMIN_EMAIL', 'admin@example.com')
password = os.environ.get('ADMIN_PASSWORD', '123456')

try:
    u = User.objects.get(username=username)
    u.set_password(password)
    u.is_staff = True
    u.is_superuser = True
    u.email = email
    if u.last_login is None:
        u.last_login = timezone.now()
    u.save()
    print(f'Admin user "{username}" updated')
except User.DoesNotExist:
    # Create user with last_login set
    u = User(username=username, email=email, is_staff=True, is_superuser=True, last_login=timezone.now())
    u.set_password(password)
    u.save()
    print(f'Admin user "{username}" created')

