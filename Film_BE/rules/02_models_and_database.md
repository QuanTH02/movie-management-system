# Models and Database Guidelines

## Overview

This document outlines the standards and best practices for defining models and working with the database in our Django project.

## Base Model

All models should inherit from the `BaseModel` class in `apps/core/models.py`, which provides:

- `created_at`: Timestamp when the record was created
- `created_by`: Foreign key to the user who created the record
- `updated_at`: Timestamp when the record was last updated
- `updated_by`: Foreign key to the user who last updated the record

## Model Design Principles

1. **Follow Django's conventions**: Use Django's built-in field types appropriately
2. **Use meaningful field names**: Names should clearly indicate the field's purpose
3. **Document complex fields**: Add docstrings for fields that need explanation
4. **Set appropriate constraints**: Use `null`, `blank`, `default`, and validators properly
5. **Define relationships correctly**: Choose the right relationship type (ForeignKey, ManyToMany, OneToOne)
6. **Implement Meta options**: Set verbose names, ordering, indexes, and constraints
7. **Keep models focused**: Each model should have a clear, single responsibility

## Database Migrations

- Create migrations after model changes with `python manage.py makemigrations`
- Review migrations before applying them
- Test migrations thoroughly, especially for data migrations
- Document complex migrations with comments
- Never modify migration files after they've been committed to version control

## Field Types Best Practices

- Use `CharField` with appropriate `max_length` for string data
- Use `TextField` for long text content
- Use `IntegerField`, `FloatField`, or `DecimalField` for numeric data (prefer `DecimalField` for financial data)
- Use `DateField` and `DateTimeField` with `auto_now` or `auto_now_add` as appropriate
- Set `db_index=True` for fields frequently used in filtering and ordering

## Model Methods

- Implement `__str__` methods for all models to provide readable representations
- Use `@property` for calculated fields
- Define class methods for operations that don't require a model instance
- Keep methods focused on a single responsibility

## Relationships

- Use descriptive `related_name` attributes
- Consider `on_delete` behavior carefully (CASCADE, SET_NULL, PROTECT, etc.)
- Use `through` models for complex many-to-many relationships
- Consider database performance when designing relationships

## Querying Best Practices

- Use Django's ORM effectively to avoid N+1 query problems
- Use `select_related` and `prefetch_related` to optimize queries
- Create custom managers for complex query logic
- Use `F()` expressions for database-level operations
- Use `Q()` objects for complex queries

## Example

```python
from django.db import models
from apps.core.models import BaseModel
from apps.users.models import User

class Project(BaseModel):
    name = models.CharField(max_length=100, help_text="Project name")
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
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

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.name

    @property
    def member_count(self):
        return self.members.count()
```

Following these guidelines ensures a consistent, maintainable, and efficient database design throughout the project.
