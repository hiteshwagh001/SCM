import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from './ToastNotification';

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('authToken', token);

            showSuccessToast('Login successful! Redirecting...');
            navigate('/dashboard');  // Redirect to dashboard after login
        } else {
            showErrorToast('No token found in the URL');
            navigate('/login');  // Redirect to login page on failure
        }
    }, [location, navigate]);

    return <div>Processing login...</div>;
};

export default OAuth2RedirectHandler;
