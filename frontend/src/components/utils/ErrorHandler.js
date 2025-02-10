// src/utils/ErrorHandler.js
class ErrorHandler {
    static handleError(error) {
        let errorMessage = "An error occurred.";

        if (error.response) {
            // Log response status for debugging
            console.log(error.response.status);

            const status = error.response.status;
            switch (status) {
                case 400:
                    errorMessage = "Bad Request.";
                    break;
                case 401:
                    errorMessage = "Unauthorized. Please log in.";
                    // Remove token and redirect to login
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    break;
                case 403:
                    errorMessage = "Forbidden access.";
                    localStorage.removeItem('authToken');
                    break;
                case 404:
                    errorMessage = "Resource not found.";
                    break;
                case 406:
                    // Handle form validation errors
                    console.log(error.response.data);
                    
                    if (error.response.data) {
                        errorMessage = error.response.data
                            .map(err => err.defaultMessage)
                            .join(", ");
                    } else {
                        errorMessage = "Form validation error.";
                    }
                    break;
                case 500:
                    errorMessage = "Internal server error.";
                    break;
                default:
                    errorMessage = `Error: ${status}`;
            }
        } else if (error.request) {
            // Server did not respond
            errorMessage = "No response from server.";
        } else {
            // Handle non-Axios errors (network or other issues)
            errorMessage = error.message;
        }

        return errorMessage;
    }
}

export default ErrorHandler;
