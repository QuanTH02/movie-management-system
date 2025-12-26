import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler for DRF.
    Returns standardized error responses.
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)

    # If unexpected error occurs (not handled by DRF)
    if response is None:
        logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
        return Response(
            {
                "status": "error",
                "code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "An unexpected error occurred.",
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    # Customize the response format
    if isinstance(response.data, dict):
        error_data = {
            "status": "error",
            "code": response.status_code,
        }

        # Handle different error formats
        if "detail" in response.data:
            error_data["message"] = response.data["detail"]
        elif "non_field_errors" in response.data:
            error_data["message"] = response.data["non_field_errors"][0]
        else:
            error_data["errors"] = response.data
            error_data["message"] = "Validation error"

        response.data = error_data

    return response
