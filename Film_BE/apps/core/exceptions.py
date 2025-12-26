from rest_framework import status
from rest_framework.exceptions import APIException


class ResourceNotFoundException(APIException):
    """Exception raised when a requested resource is not found."""

    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "The requested resource was not found."
    default_code = "resource_not_found"


class InvalidOperationException(APIException):
    """Exception raised when an operation is not valid."""

    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "This operation is not valid."
    default_code = "invalid_operation"


class InsufficientPermissionsException(APIException):
    """Exception raised when user doesn't have permission to perform an action."""

    status_code = status.HTTP_403_FORBIDDEN
    default_detail = "You don't have permission to perform this action."
    default_code = "insufficient_permissions"


class BusinessLogicException(APIException):
    """Exception raised when a business rule validation fails."""

    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "A business rule validation failed."
    default_code = "business_logic_error"
