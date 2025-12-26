from django.contrib.auth.models import User
from django.db import models


class BaseModel(models.Model):
    """
    Base model that provides common fields for all models.
    All models should inherit from this class.
    """

    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the record was created")
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="%(class)s_created",
        help_text="User who created the record",
    )
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when the record was last updated")
    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="%(class)s_updated",
        help_text="User who last updated the record",
    )

    class Meta:
        abstract = True
