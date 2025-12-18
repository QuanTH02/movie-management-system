.PHONY: test test-unit test-api test-cov test-watch help

help:
	@echo "Available test commands:"
	@echo "  make test          - Run all tests"
	@echo "  make test-unit     - Run unit tests only"
	@echo "  make test-api      - Run API tests only"
	@echo "  make test-cov      - Run tests with coverage report"
	@echo "  make test-watch    - Run tests in watch mode"

test:
	pytest

test-unit:
	pytest -m unit

test-api:
	pytest -m api

test-cov:
	pytest --cov=App_Film_BE --cov-report=html --cov-report=term

test-watch:
	pytest-watch

