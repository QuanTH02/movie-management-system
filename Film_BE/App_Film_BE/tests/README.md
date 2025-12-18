# Backend Testing Guide

## Quick Start

```bash
# Run all tests
pytest

# Run specific test file
pytest App_Film_BE/tests/test_views.py

# Run with coverage
pytest --cov=App_Film_BE --cov-report=html

# Run specific markers
pytest -m api          # API tests only
pytest -m unit         # Unit tests only
pytest -m "not slow"   # Skip slow tests

# Using Makefile
make test
make test-api
make test-cov

# Using script
./run_tests.sh
```

## Test Types

### 1. Unit Tests
- Model methods
- Utility functions
- Business logic

### 2. API/View Tests
- Endpoint responses
- Authentication
- Request/response validation

### 3. Integration Tests
- Full workflows
- Database operations
- External service interactions

## Writing Tests

### View/API Test Example
```python
@pytest.mark.django_db
@pytest.mark.api
def test_get_film_list(api_client):
    url = reverse('film-list')
    response = api_client.get(url)
    
    assert response.status_code == 200
    assert isinstance(response.data, list)
```

### Model Test Example
```python
@pytest.mark.django_db
@pytest.mark.model
def test_model_creation():
    movie = Movie.objects.create(name='Test Movie')
    assert movie.name == 'Test Movie'
```

### Using Factories
```python
@pytest.mark.django_db
def test_with_factory(user_factory):
    user = user_factory()
    assert user.username is not None
```

## Available Fixtures

- `api_client` - REST API client
- `client` - Django test client
- `user` - Test user instance
- `authenticated_api_client` - Authenticated API client
- `user_factory` - User factory

## Best Practices

1. Use `@pytest.mark.django_db` for database tests
2. Use factories for test data
3. Mark tests with appropriate markers
4. Keep tests fast and isolated
5. Test edge cases and error conditions

