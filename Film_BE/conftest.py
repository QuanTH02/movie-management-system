"""
Pytest configuration and fixtures for Django tests.
"""
import pytest
from django.test import Client
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from faker import Faker
import factory
from factory import django

fake = Faker()
User = get_user_model()


@pytest.fixture(scope='session')
def django_db_setup(django_db_setup, django_db_blocker):
    """Setup database for all tests."""
    pass


@pytest.fixture
def api_client():
    """API client for testing REST API endpoints."""
    return APIClient()


@pytest.fixture
def client():
    """Django test client."""
    return Client()


@pytest.fixture
def user(db):
    """Create a test user."""
    return User.objects.create_user(
        username=fake.user_name(),
        email=fake.email(),
        password='testpass123'
    )


@pytest.fixture
def authenticated_api_client(api_client, user):
    """API client authenticated with a user."""
    api_client.force_authenticate(user=user)
    return api_client


@pytest.fixture
def authenticated_client(client, user):
    """Django test client authenticated with a user."""
    client.force_login(user)
    return client


# Factory classes for creating test data
class UserFactory(django.DjangoModelFactory):
    """Factory for creating User instances."""
    class Meta:
        model = User
        django_get_or_create = ('username',)

    username = factory.Sequence(lambda n: f'user{n}')
    email = factory.LazyAttribute(lambda obj: f'{obj.username}@example.com')
    password = factory.PostGenerationMethodCall('set_password', 'testpass123')


@pytest.fixture
def user_factory():
    """Factory fixture for creating users."""
    return UserFactory

