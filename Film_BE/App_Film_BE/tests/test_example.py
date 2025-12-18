"""
Simple example test to verify pytest setup is working.
Run this first to ensure everything is configured correctly.
"""
import pytest


@pytest.mark.django_db
def test_database_connection():
    """Test that database connection works."""
    from django.db import connection
    assert connection.ensure_connection() is None


def test_basic_math():
    """Simple test to verify pytest is working."""
    assert 1 + 1 == 2


@pytest.mark.unit
def test_string_operations():
    """Test string operations."""
    text = "Hello World"
    assert text.lower() == "hello world"
    assert len(text) == 11

