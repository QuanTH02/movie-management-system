# Testing Guide for Backend

## Setup

All testing dependencies are installed in requirements.txt. Install them with:

```bash
pip install -r requirements.txt
```

## Running Tests

### Run all tests
```bash
pytest
```

### Run specific test file
```bash
pytest App_Film_BE/tests/test_views.py
```

### Run tests with coverage
```bash
pytest --cov=App_Film_BE --cov-report=html
```

### Run specific test markers
```bash
pytest -m api          # Run only API tests
pytest -m unit         # Run only unit tests
pytest -m "not slow"   # Skip slow tests
```

### Using Makefile
```bash
make test          # Run all tests
make test-unit     # Run unit tests
make test-api      # Run API tests
make test-cov      # Run with coverage
```

## Test Structure

- `App_Film_BE/tests/` - All test files
- `conftest.py` - Pytest configuration and fixtures
- `pytest.ini` - Pytest settings

## Available Fixtures

- `api_client` - REST API client for testing
- `client` - Django test client
- `user` - Test user instance
- `authenticated_api_client` - Authenticated API client
- `authenticated_client` - Authenticated Django client
- `user_factory` - Factory for creating users

## Example Test

```python
@pytest.mark.django_db
@pytest.mark.api
def test_get_film_list(api_client):
    url = reverse('film-list')
    response = api_client.get(url)
    assert response.status_code == 200
```

