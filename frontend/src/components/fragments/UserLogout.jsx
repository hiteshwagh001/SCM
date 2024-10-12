import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../ToastNotification";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../store/Slices/userSlice";
import { LogOut } from "lucide-react";

export default function UserLogout() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        // Clear JWT token from localStorage or any storage used
        localStorage.removeItem("authToken");
        dispatch(logoutSuccess())

        // Show success toast
        showSuccessToast("Logged out successfully!");

        // Redirect user to the login page
        navigate("/login");
    };

    return (
        <div
            onClick={() => handleLogout(navigate, dispatch)}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"        >
            <LogOut className="inline-block mr-2" size={16} /> Logout
        </div>
    );
}
