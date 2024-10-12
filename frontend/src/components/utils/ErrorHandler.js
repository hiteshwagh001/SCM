// src/utils/ErrorHandler.js
class ErrorHandler {
    static handleError(error) {
        let errorMessage = "An error occurred.";

        if (error.response) {
            console.log(error.response.status)
            // Server responded with a status code other than 2xx
            const status = error.response.status;
            switch (status) {
                case 400:
                    errorMessage = "Bad Request.";
                    break;
                case 401:
                    errorMessage = "Unauthorized. Please log in.";
                    // Optionally, trigger logout or token removal here
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    break;
                case 403:
                    errorMessage = "Forbidden access.";
                    localStorage.removeItem('authToken')
                    break;
                case 404:
                    errorMessage = "Resource not found.";
                    break;
                case 500:
                    errorMessage = "Internal server error.";
                    break;
                default:
                    errorMessage = `Error: ${status}`;
            }
        } else if (error.request) {
            // No response from server
            errorMessage = "No response from server.";
        } else {
            // Other errors
            errorMessage = error.message;
        }

        return errorMessage;
    }
}

export default ErrorHandler;
