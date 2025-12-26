# Code Style and Conventions Guidelines

## Overview

This document outlines the standards and best practices for code style and conventions in our Django project. Consistent code style improves readability, reduces errors, and makes maintenance easier for all team members.

## Python Code Style

### PEP 8 Compliance

We follow the [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide for Python code with a few customizations. Key points include:

- Use 4 spaces for indentation (no tabs)
- Maximum line length of 100 characters (120 in some cases)
- Use snake_case for variable, function, and method names
- Use CamelCase for class names
- Use uppercase with underscores for constants
- Separate top-level functions and classes with two blank lines
- Separate class methods with one blank line
- Use descriptive names for variables, functions, and classes

### Imports

Organize imports into groups with a blank line between each group:

1. Standard library imports
2. Related third-party imports
3. Local application/library specific imports

```python
# Standard library
import json
import os
from datetime import datetime

# Third-party
import requests
from rest_framework import serializers
from django.db import models

# Local
from apps.core.models import BaseModel
from apps.users.models import User
```

Sort imports alphabetically within each group using tools like `isort`.

### Docstrings

Use docstrings for all modules, classes, methods, and functions:

```python
def calculate_total_price(items, discount=0, tax_rate=0.1):
    """
    Calculate the total price for a list of items, applying discount and tax.

    Args:
        items (list): List of items, each with a 'price' attribute
        discount (float): Discount amount to subtract from the total (default: 0)
        tax_rate (float): Tax rate to apply after discount (default: 0.1)

    Returns:
        float: The total price including tax

    Raises:
        ValueError: If any item does not have a 'price' attribute
    """
    subtotal = sum(item.price for item in items)
    discounted = subtotal - discount
    total = discounted * (1 + tax_rate)
    return total
```

### Type Hints

Use type hints for function parameters and return values:

```python
from typing import List, Dict, Optional, Union, Any

def process_user_data(
    user_id: int,
    fields: List[str],
    options: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Process user data and return selected fields."""
    if options is None:
        options = {}
    # Implementation
    return result
```

## Django-Specific Conventions

### Model Definitions

- Define model fields in a logical order
- Group related fields together
- Place ForeignKey and relationship fields after regular fields
- Define Meta class after field definitions
- Define **str** method after Meta class
- Define custom methods after built-in methods

```python
class Project(BaseModel):
    # Basic fields
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    status = models.CharField(
        max_length=20,
        choices=PROJECT_STATUS_CHOICES,
        default=STATUS_DRAFT
    )

    # Relationship fields
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="owned_projects"
    )
    members = models.ManyToManyField(
        User,
        related_name="member_projects",
        blank=True
    )

    # Meta class
    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        indexes = [
            models.Index(fields=["name", "status"]),
        ]

    # String representation
    def __str__(self):
        return self.name

    # Custom methods
    def add_member(self, user):
        """Add a user to the project members."""
        if user not in self.members.all():
            self.members.add(user)

    def is_user_member(self, user):
        """Check if a user is a member of the project."""
        return user == self.owner or user in self.members.all()
```

### URL Patterns

Follow consistent URL naming patterns:

```python
# apps/projects/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.projects.views import ProjectViewSet

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")

urlpatterns = [
    path("", include(router.urls)),
    path("projects/<int:project_id>/reports/", ReportView.as_view(), name="project-reports"),
]
```

### View Classes

Organize view methods logically:

1. Class variables and attributes
2. Constructor and setup methods
3. HTTP method handlers (get, post, etc.)
4. Helper methods

```python
class ProjectDetailView(APIView):
    permission_classes = [IsAuthenticated, IsProjectMember]
    serializer_class = ProjectDetailSerializer

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.project_id = kwargs.get("pk")

    def get(self, request, *args, **kwargs):
        project = self.get_project()
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        project = self.get_project()
        serializer = self.serializer_class(project, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def get_project(self):
        try:
            return Project.objects.get(id=self.project_id)
        except Project.DoesNotExist:
            raise NotFound("Project not found")
```

## Tools and Enforcement

### Code Formatting Tools

We use the following tools to enforce code style:

- **Black**: Code formatter to automatically format Python code
- **isort**: Sort imports alphabetically and separate into sections
- **Flake8**: Linter to check for PEP 8 compliance and other issues
- **mypy**: Static type checker for Python

### Configuration Files

```
# pyproject.toml
[tool.isort]
profile = "black"

[tool.mypy]
python_version = "3.10"
ignore_missing_imports = true
check_untyped_defs = true
warn_unused_ignores = true
warn_no_return = true
warn_return_any = true
warn_unused_configs = true

[tool.black]
target-version = ['py310']
include = '\.pyi?$'

[tool.flake8]
ignore = "E501"
max-line-length = 120
```

### Pre-commit Hooks

We use pre-commit hooks to run these tools automatically before commit:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort

  - repo: https://github.com/psf/black
    rev: 23.3.0
    hooks:
      - id: black

  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
        additional_dependencies: [flake8-django]

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.3.0
    hooks:
      - id: mypy
        additional_dependencies: [django-stubs]
```

## Naming Conventions

### File Naming

- Use lowercase with underscores for file names
- Use descriptive names that reflect the content
- Use standard names for common files (`models.py`, `views.py`, etc.)

### Variable and Function Naming

- Use descriptive names that explain the purpose
- Avoid single-letter variable names (except in short loops)
- Prefix boolean variables with `is_`, `has_`, `can_`, etc.
- Use verb phrases for function names (`get_user`, `calculate_total`, etc.)

### Class Naming

- Use CamelCase for class names
- Use singular nouns for model names
- Append view type to view class names (`ProjectDetailView`, `UserListAPIView`, etc.)
- Use descriptive names that reflect the entity or behavior

## Comment Guidelines

### When to Comment

- Complex algorithms or business logic
- Non-obvious code or workarounds
- Code that addresses specific edge cases
- Public API methods
- To explain "why" rather than "what" the code does

### Comment Format

```python
# Single-line comment explaining a specific line

# Multiple lines of comments
# explaining a complex section
# of code

# TODO: Mark tasks that need to be done
# FIXME: Mark code that needs to be fixed
# NOTE: Add important notes for other developers
```

## Code Organization

### File Length

Keep files to a reasonable length (generally under 500 lines). Split large files into logical modules.

### Function Length

Keep functions focused and concise (generally under 50 lines). If a function is getting too long, consider breaking it into smaller, more focused functions.

### Parameter Count

Limit the number of parameters for functions and methods. If a function requires many parameters, consider using a configuration object or dataclass.

## Best Practices

1. **DRY (Don't Repeat Yourself)**: Avoid code duplication
2. **KISS (Keep It Simple, Stupid)**: Prefer simple solutions over complex ones
3. **YAGNI (You Aren't Gonna Need It)**: Don't add functionality until it's necessary
4. **Single Responsibility Principle**: Each function, class, or module should have one responsibility
5. **Readable code over clever code**: Prioritize readability over clever or compact code
6. **Explicit over implicit**: Make behavior explicit rather than relying on implicit behavior
7. **Favor composition over inheritance**: Use composition for code reuse when possible
8. **Consistent error handling**: Follow project standards for error handling
9. **Test coverage**: Write tests for all new code

By following these code style and conventions guidelines, we ensure our codebase remains consistent, readable, and maintainable by all team members.
