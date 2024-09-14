import axios from 'axios';
import { useEffect, useState } from 'react';

function ProfileUi() {
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState(null);

    const token = localStorage.getItem('authToken');

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/auth/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setProfile(response.data);  // Automatically parsed JSON in Axios
            } else {
                setMessage("Error in fetching user data");
            }
        } catch (error) {
            console.error("Internal server error", error);
            setMessage("Error occurred during server request");
        }
    }

    useEffect(() => {
        if (token) {
            fetchUserData(token);
        } else {
            setMessage("No authentication token found.");
        }
    }, [token]);

    return (
        <div className="max-w-md mx-auto p-6">
            {profile ? (
                <div>
                    <h1>Username: {profile.username}</h1>
                    {/* Display other profile info here */}
                </div>
            ) : (
                <h1>{message || "Loading profile..."}</h1>
            )}
        </div>
    );
}

export default ProfileUi;
