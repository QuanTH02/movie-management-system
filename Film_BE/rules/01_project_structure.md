# Project Structure Guidelines

## Overview

This document outlines the structure of our Django backend project and provides guidelines for maintaining consistency when adding new components.

## Directory Structure

- `aiWriting/`: Main project directory containing settings, configuration, and core project files
  - `settings.py`: Project settings and configuration
  - `urls.py`: Main URL routing
  - `celery.py`: Celery configuration for asynchronous tasks
  - `authentication.py`: Custom authentication classes
  - `config.py`: Environment-specific configuration
  - `tasks.py`: Project-level task definitions
- `apps/`: Contains all Django applications
  - Each app represents a specific domain of functionality (users, organizations, projects, etc.)
- `utils/`: Utility functions and helpers used across the project
- `staticfiles/`: Static files collected for production

## Application Structure Guidelines

Each application should maintain the following structure:

- `models.py`: Data models that inherit from `BaseModel`
- `views.py`: API views using Django REST Framework
- `serializers.py`: Data serializers for API responses
- `urls.py`: URL routing for the app
- `services/`: Business logic layer separating views from models
- `tests/`: Unit and integration tests for the app
- `migrations/`: Database migrations
- `factories.py`: Factory classes for testing
- `management/commands/`: Custom management commands

## Adding New Applications

1. Create a new directory in the `apps/` folder
2. Implement the core files (models, views, serializers, urls)
3. Register the app in `INSTALLED_APPS` in settings.py
4. Include the app's URLs in the main `urls.py`
5. Create necessary migrations

## Code Organization Principles

- Follow separation of concerns
- Keep models focused on data structure
- Place business logic in services
- Keep views thin and focused on request/response handling
- Include proper tests for all functionality

## Naming Conventions

- Use singular nouns for model names (e.g., `User`, not `Users`)
- Use plural nouns for application names (e.g., `users`, not `user`)
- Use meaningful and descriptive names for all components

By following these guidelines, we maintain a consistent and maintainable project structure that is easy to navigate and extend.
