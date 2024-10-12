import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, setStatus } from '../../store/Slices/userSlice';

function ProfileUi() {
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const status = useSelector((state) => state.user.status); // You can use this to show loading or error states

    const token = localStorage.getItem('authToken');

    const fetchUserData = async (token) => {
        dispatch(setStatus('loading'));
        try {
            const response = await axios.get("http://localhost:8080/auth/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                dispatch(loginSuccess(response.data)); // Store user details in Redux store
                console.log(response.data)
                dispatch(setStatus('succeeded'));
            } else {
                setMessage("Error in fetching user data.");
                dispatch(setStatus('failed'));
            }
        } catch (error) {
            console.error("Internal server error", error);
            setMessage("Error occurred during server request.");
            dispatch(setStatus('failed'));
        }
    };

    useEffect(() => {
        if (token && !isAuthenticated) {
            fetchUserData(token); // Fetch user data if token exists and user isn't authenticated
        } else if (!token) {
            setMessage("No authentication token found.");
        }
    }, [token, isAuthenticated, dispatch]);

    return (
        <div className="max-w-md mx-auto p-6">
            {status === 'loading' ? (
                <h1>Loading profile...</h1>
            ) : isAuthenticated ? (
                <div>
                    <h1>Username: {user.username}</h1>
                    <h2>{user.profilePicture}</h2>
                    {/* Display other profile info here */}
                </div>
            ) : (
                <h1>{message || "Please log in to view your profile."}</h1>
            )}
        </div>
    );
}

export default ProfileUi;
