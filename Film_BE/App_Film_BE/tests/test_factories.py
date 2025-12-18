"""
Factory classes for creating test data.
Using factory-boy to generate realistic test data.
"""
import factory
from factory import django
from faker import Faker

fake = Faker()

# Import your models here
# from App_Film_BE.models import Movie, Account, etc.


# Example factory (update with your actual models)
# class MovieFactory(django.DjangoModelFactory):
#     """Factory for creating Movie instances."""
#     class Meta:
#         model = Movie
#         django_get_or_create = ('name',)
#
#     name = factory.Sequence(lambda n: f'Movie {n}')
#     rating = factory.Faker('random_int', min=1, max=10)
#     total_vote = factory.Faker('random_int', min=0, max=1000)

