# Environment Variables and Configuration Guidelines

## Overview

This document outlines the standards and best practices for managing environment variables and configuration in our Django project. Proper configuration management is essential for security, flexibility, and maintainability across different deployment environments.

## Environment Variables Management

### Using python-dotenv

We use python-dotenv to load environment variables from .env files:

```python
# settings.py
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
```

### Environment Variable Template

We maintain a `.env.example` file in the repository that serves as a template:

```
# Database Configuration
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=db
DB_PORT=3306

# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=example@gmail.com
EMAIL_HOST_PASSWORD=your-email-password

# Third-party Services
OPENAI_API_KEY=your-openai-api-key
SENTRY_DSN=your-sentry-dsn
```

### Environment Types

We support different environment types with appropriate settings:

- Development
- Testing
- Staging
- Production

## Configuration Hierarchy

### Settings Structure

Configuration follows a hierarchical structure:

1. Default settings in `settings.py`
2. Environment-specific overrides from environment variables
3. Local overrides (not committed to version control)

### Settings Loading

```python
# settings.py

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY", "insecure-development-key")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "True").lower() == "true"

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "OPTIONS": {"charset": "utf8mb4"},
        "NAME": os.getenv("DB_NAME", "mydatabase"),
        "USER": os.getenv("DB_USER", "myuser"),
        "PASSWORD": os.getenv("DB_PASSWORD", "mypassword"),
        "HOST": os.getenv("DB_HOST", "db"),
        "PORT": os.getenv("DB_PORT", "3306"),
    },
}
```

## Configuration Module

### Centralized Configuration

We use a dedicated configuration module (`config.py`) for complex settings or those that require processing:

```python
# aiWriting/config.py
import os
from typing import List, Dict, Any, Optional

class AppConfig:
    """Centralized application configuration."""

    @property
    def debug(self) -> bool:
        """Whether the application is in debug mode."""
        return os.getenv("DEBUG", "True").lower() == "true"

    @property
    def api_keys(self) -> Dict[str, str]:
        """API keys for external services."""
        return {
            "openai": os.getenv("OPENAI_API_KEY", ""),
            "google_ads": os.getenv("GOOGLE_ADS_API_KEY", ""),
            "deepl": os.getenv("DEEPL_API_KEY", ""),
        }

    @property
    def email_config(self) -> Dict[str, Any]:
        """Email configuration."""
        return {
            "host": os.getenv("EMAIL_HOST", "smtp.gmail.com"),
            "use_tls": True,
            "port": 587,
            "user": os.getenv("EMAIL_HOST_USER", ""),
            "password": os.getenv("EMAIL_HOST_PASSWORD", ""),
            "default_from": os.getenv("DEFAULT_FROM_EMAIL", "noreply@example.com"),
        }

    @property
    def storage_settings(self) -> Dict[str, Any]:
        """Storage configuration."""
        storage_type = os.getenv("STORAGE_TYPE", "local")

        if storage_type == "azure":
            return {
                "type": "azure",
                "account_name": os.getenv("AZURE_STORAGE_ACCOUNT_NAME", ""),
                "account_key": os.getenv("AZURE_STORAGE_ACCOUNT_KEY", ""),
                "container": os.getenv("AZURE_STORAGE_CONTAINER", ""),
            }
        else:
            return {
                "type": "local",
                "root_path": os.getenv("LOCAL_STORAGE_PATH", "/app/media"),
            }

# Create a singleton instance
app_config = AppConfig()
```

### Usage in the Application

Use the configuration module throughout the application:

```python
# Example usage in a service
from aiWriting.config import app_config

def connect_to_openai():
    api_key = app_config.api_keys["openai"]
    if not api_key:
        raise ValueError("OpenAI API key is not configured")

    return openai.Client(api_key=api_key)
```

## Environment-Specific Settings

### Multiple Settings Files

For complex projects, consider using multiple settings files:

```
aiWriting/
  ├── settings/
  │   ├── __init__.py
  │   ├── base.py        # Common settings
  │   ├── development.py # Development overrides
  │   ├── testing.py     # Testing overrides
  │   ├── staging.py     # Staging overrides
  │   └── production.py  # Production overrides
```

### Loading the Right Settings

Use the `DJANGO_SETTINGS_MODULE` environment variable to specify which settings to use:

```bash
# For development
export DJANGO_SETTINGS_MODULE=aiWriting.settings.development

# For production
export DJANGO_SETTINGS_MODULE=aiWriting.settings.production
```

## Sensitive Information

### Handling Secrets

- Never commit secrets to version control
- Use environment variables for secrets
- Consider using a secrets manager for production

### Sensitive Settings

Treat the following as sensitive:

- Database credentials
- Secret keys
- API keys and tokens
- Email credentials
- OAuth credentials
- Encryption keys

## Local Development Environment

### Local .env File

Developers should create their own `.env` file for local development:

1. Copy `.env.example` to `.env`
2. Fill in the necessary values
3. Do not commit `.env` to version control

### Docker Compose Example

```yaml
# docker-compose.yml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./:/app
    env_file:
      - .env
    depends_on:
      - db
      - redis

  db:
    image: mysql:8
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db_data:/var/lib/mysql

  redis:
    image: redis:6
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  db_data:
  redis_data:
```

## Configuration Validation

### Validate Required Settings

Validate required settings at startup:

```python
# utils/config_validator.py
import os
import sys

def validate_required_env_vars():
    """Validate that all required environment variables are set."""
    required_vars = [
        "SECRET_KEY",
        "DB_NAME",
        "DB_USER",
        "DB_PASSWORD",
    ]

    # Additional vars required in production
    if os.getenv("ENVIRONMENT") == "production":
        required_vars.extend([
            "SENTRY_DSN",
            "EMAIL_HOST_USER",
            "EMAIL_HOST_PASSWORD",
        ])

    missing_vars = [var for var in required_vars if not os.getenv(var)]

    if missing_vars:
        print(f"Error: The following environment variables are required but not set: {', '.join(missing_vars)}")
        sys.exit(1)
```

### Using the Validator

Call the validator during startup:

```python
# wsgi.py or asgi.py
import os
from utils.config_validator import validate_required_env_vars

# Validate configuration before starting the application
if not os.getenv("SKIP_ENV_VALIDATION"):
    validate_required_env_vars()

# ... rest of the file
```

## Documentation

### Document Configuration Options

Document all configuration options in:

- Code comments
- README files
- Deployment documentation

### Example Documentation Entry

```markdown
## DATABASE_URL

Connection string for the database.

Format: `mysql://user:password@host:port/dbname`

Default: None (must be provided)

Required in: All environments

Example: `mysql://app_user:pass123@localhost:3306/app_db`
```

## Best Practices

1. **Default values**: Provide sensible defaults for non-sensitive settings
2. **Validation**: Validate configuration at startup
3. **Type conversion**: Convert environment variables to the correct types
4. **Environment specificity**: Make it clear which settings are environment-specific
5. **Minimal access**: Apply the principle of least privilege
6. **Configuration versioning**: Version your configuration schema
7. **Configuration testing**: Test with different configurations
8. **Documentation**: Document all configuration options
9. **Secrets management**: Use a secrets manager for production environments
10. **Consistency**: Use consistent naming conventions

By following these environment variables and configuration guidelines, we ensure our application is secure, flexible, and maintainable across different deployment environments.
