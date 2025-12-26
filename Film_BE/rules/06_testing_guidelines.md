# Testing Guidelines

## Overview

This document outlines the standards and best practices for testing in our Django project. Comprehensive testing is essential for maintaining code quality, preventing regressions, and ensuring the reliability of our application.

## Testing Structure

- Tests should be organized in a `tests` directory within each app
- Further organize tests by test type (unit, integration, etc.)
- Use descriptive test class and method names

```
apps/
  ├── users/
  │   ├── tests/
  │   │   ├── __init__.py
  │   │   ├── test_models.py
  │   │   ├── test_serializers.py
  │   │   ├── test_views.py
  │   │   └── test_services.py
  │   ├── models.py
  │   └── ...
```

## Test Types

### Unit Tests

- Test individual components in isolation
- Mock external dependencies
- Focus on a single function or method
- Keep tests small and focused

### Integration Tests

- Test the interaction between components
- Verify different parts of the system work together
- Include database interactions
- Test API endpoints

### End-to-End Tests

- Test the complete flow of user interactions
- Simulate real user behavior
- Cover critical business processes
- Use tools like Selenium for browser-based testing

## Test Tools and Libraries

### Required Testing Libraries

The following testing libraries are configured and available:

- **pytest** (^8.0.0): Modern testing framework with powerful features
- **pytest-django** (^4.8.0): Pytest plugin for Django integration
- **pytest-cov** (^4.1.0): Coverage plugin for pytest
- **pytest-mock** (^3.12.0): Mocking plugin for pytest
- **pytest-xdist** (^3.5.0): Parallel test execution
- **coverage** (^7.4.0): Code coverage measurement
- **factory-boy** (^3.3.0): Test data factories (already in dependencies)

### Django Test Framework

- Django's TestCase for database-backed tests
- SimpleTestCase for tests that don't need the database
- APITestCase for testing REST APIs

### Running Tests

```bash
# Run all tests
pytest

# Run tests with coverage
pytest --cov=apps --cov-report=html

# Run specific test file
pytest apps/users/tests/test_models.py

# Run tests in parallel
pytest -n auto

# Run tests with markers
pytest -m unit
pytest -m integration
```

### Pytest Configuration

Pytest is configured in `pyproject.toml` with:

- Django settings module: `aiWriting.settings`
- Test discovery patterns
- Coverage reporting
- Test markers (unit, integration, e2e, slow)

See `conftest.py` for shared fixtures and configuration.

## Factory Classes

Use factory_boy to create test data consistently:

```python
# apps/users/factories.py
import factory
from apps.users.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"user{n}")
    email = factory.LazyAttribute(lambda o: f"{o.username}@example.com")
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    is_active = True

    @factory.post_generation
    def set_password(self, create, extracted, **kwargs):
        self.set_password('password123')
        self.save()
```

## Writing Tests

### Model Tests

```python
# apps/projects/tests/test_models.py
from django.test import TestCase
from apps.projects.models import Project
from apps.users.factories import UserFactory

class ProjectModelTest(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.project = Project.objects.create(
            name="Test Project",
            description="Project for testing",
            owner=self.user,
            created_by=self.user
        )
        self.project.members.add(self.user)

    def test_project_creation(self):
        self.assertEqual(self.project.name, "Test Project")
        self.assertEqual(self.project.owner, self.user)
        self.assertEqual(self.project.members.count(), 1)

    def test_str_method(self):
        self.assertEqual(str(self.project), "Test Project")
```

### Serializer Tests

```python
# apps/projects/tests/test_serializers.py
from django.test import TestCase
from apps.projects.models import Project
from apps.projects.serializers import ProjectSerializer
from apps.users.factories import UserFactory

class ProjectSerializerTest(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.project_data = {
            "name": "New Project",
            "description": "A project created from serializer",
            "is_active": True
        }

    def test_valid_serializer(self):
        serializer = ProjectSerializer(data=self.project_data)
        self.assertTrue(serializer.is_valid())

    def test_serializer_missing_name(self):
        invalid_data = self.project_data.copy()
        invalid_data.pop("name")
        serializer = ProjectSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)
```

### View Tests

```python
# apps/projects/tests/test_views.py
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.projects.models import Project
from apps.users.factories import UserFactory

class ProjectViewSetTest(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.client.force_authenticate(user=self.user)
        self.project = Project.objects.create(
            name="Test Project",
            description="Project for testing",
            owner=self.user,
            created_by=self.user
        )
        self.project.members.add(self.user)

    def test_list_projects(self):
        url = reverse('project-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_project(self):
        url = reverse('project-list')
        data = {
            "name": "New Project",
            "description": "A new test project"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 2)
        self.assertEqual(response.data['name'], "New Project")
```

### Service Tests

```python
# apps/projects/tests/test_services.py
from django.test import TestCase
from django.core.exceptions import ValidationError
from apps.projects.services.project_service import ProjectService
from apps.users.factories import UserFactory

class ProjectServiceTest(TestCase):
    def setUp(self):
        self.user = UserFactory()

    def test_create_project(self):
        project = ProjectService.create_project(
            name="Service Test Project",
            description="Project created by service",
            owner=self.user
        )
        self.assertEqual(project.name, "Service Test Project")
        self.assertEqual(project.owner, self.user)
        self.assertEqual(project.members.count(), 1)
        self.assertIn(self.user, project.members.all())

    def test_add_member(self):
        project = ProjectService.create_project(
            name="Service Test Project",
            description="Project created by service",
            owner=self.user
        )
        new_user = UserFactory()
        ProjectService.add_member(project, new_user, self.user)
        self.assertEqual(project.members.count(), 2)
        self.assertIn(new_user, project.members.all())

    def test_add_existing_member(self):
        project = ProjectService.create_project(
            name="Service Test Project",
            description="Project created by service",
            owner=self.user
        )
        with self.assertRaises(ValidationError):
            ProjectService.add_member(project, self.user, self.user)
```

## Test Coverage

- Aim for high test coverage (at least 80%)
- Prioritize coverage of critical and complex code
- Run coverage reports regularly
- Use coverage tools to identify untested code

```bash
# Running tests with coverage (pytest)
pytest --cov=apps --cov-report=term-missing --cov-report=html

# Or using coverage directly
coverage run --source='apps' -m pytest
coverage report
coverage html  # Generates an HTML report
```

### Pytest Markers

Use markers to categorize tests:

```python
import pytest

@pytest.mark.unit
def test_user_creation():
    """Unit test for user creation."""
    pass

@pytest.mark.integration
def test_user_login_flow():
    """Integration test for login flow."""
    pass

@pytest.mark.slow
def test_large_data_processing():
    """Slow running test."""
    pass
```

Run tests by marker:

```bash
pytest -m unit          # Run only unit tests
pytest -m "not slow"    # Run all tests except slow ones
```

## Mocking

Use mocking to isolate the code being tested:

```python
from unittest import mock
from django.test import TestCase
from apps.projects.services.external_service import ExternalAPIService

class ExternalServiceTest(TestCase):
    @mock.patch('apps.projects.services.external_service.requests.get')
    def test_fetch_external_data(self, mock_get):
        # Configure the mock
        mock_response = mock.Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"data": "test"}
        mock_get.return_value = mock_response

        # Test the service
        result = ExternalAPIService.fetch_data()
        self.assertEqual(result, {"data": "test"})

        # Verify the mock was called correctly
        mock_get.assert_called_once_with('https://api.example.com/data')
```

## Test Data

- Use factories to create test data
- Avoid hardcoding test data
- Create helper methods for common test setup
- Clean up test data after tests

## Integration with CI/CD

- Run tests automatically in CI/CD pipelines
- Fail builds when tests fail
- Generate and publish test reports
- Track test coverage over time

## Testing Best Practices

1. **Write tests first**: Follow test-driven development when possible
2. **Test edge cases**: Not just the happy path
3. **Keep tests independent**: Tests should not depend on each other
4. **Fast tests**: Tests should run quickly
5. **Readable tests**: Use clear assertions and meaningful names
6. **Maintainable tests**: Refactor tests as code evolves
7. **Test for regressions**: Add tests for bugs before fixing them
8. **Test configuration**: Test with different settings

By following these testing guidelines, we ensure our application remains reliable, maintainable, and free of regressions as it evolves.
