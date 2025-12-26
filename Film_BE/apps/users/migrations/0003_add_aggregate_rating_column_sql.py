# Generated manually to add aggregate_rating column using raw SQL

from django.db import migrations


def add_aggregate_rating_column(apps, schema_editor):
    """Add aggregate_rating column to follow_film_user table."""
    db_alias = schema_editor.connection.alias
    with schema_editor.connection.cursor() as cursor:
        try:
            # Try to add column (will fail silently if it already exists in some MySQL versions)
            cursor.execute("ALTER TABLE follow_film_user ADD COLUMN aggregate_rating INT DEFAULT 0")
        except Exception as e:
            # If column already exists, that's fine - just continue
            if "Duplicate column name" not in str(e) and "1050" not in str(e):
                raise


def remove_aggregate_rating_column(apps, schema_editor):
    """Remove aggregate_rating column from follow_film_user table."""
    db_alias = schema_editor.connection.alias
    with schema_editor.connection.cursor() as cursor:
        # Check if column exists first
        cursor.execute(
            """
            SELECT COUNT(*)
            FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = 'follow_film_user'
            AND COLUMN_NAME = 'aggregate_rating'
        """
        )
        column_exists = cursor.fetchone()[0] > 0

        if column_exists:
            cursor.execute("ALTER TABLE follow_film_user DROP COLUMN aggregate_rating")


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_add_aggregate_rating_to_followfilmuser"),
    ]

    operations = [
        migrations.RunPython(add_aggregate_rating_column, remove_aggregate_rating_column),
    ]
