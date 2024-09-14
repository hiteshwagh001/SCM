
const API_URL = "http://localhost:8080"; // Your Spring Boot backend URL

export const googleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
};
export const githubLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/github`;
};
