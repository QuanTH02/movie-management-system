# App_Film_BE/tests.py

from django.test import TestCase
from .models import Movieinformation
from rest_framework.test import APIRequestFactory
from .views import FilmListView

class FilmAPITestCase(TestCase):
    def test_select_all_films(self):
        # In ra giá trị của queryset
        films = Movieinformation.objects.all()
        print("Len: ", len(films))

