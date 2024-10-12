import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { Calendar, CheckCircle, Mail, Phone, Shield, User, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, setStatus } from '../../store/Slices/userSlice';
import { showErrorToast } from '../ToastNotification';
import ErrorHandler from '../utils/ErrorHandler';


const UserDashboard = () => {
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const status = useSelector((state) => state.user.status);
    const token = localStorage.getItem('authToken');

    // Function to fetch user data from the backend
    const fetchUserData = async (token) => {
        dispatch(setStatus('loading'));
        try {
            const response = await axios.get("http://localhost:8080/auth/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // console.log("data",response.data)
                dispatch(loginSuccess(response.data)); // Store user details in Redux store
                dispatch(setStatus('succeeded'));
            }
            else {
                setMessage("Error in fetching user data.");
                dispatch(setStatus('failed'));
            }
        } catch (error) {
            // console.log(error.code)
            // console.error("Internal server error", error);
            const errorMessage = ErrorHandler.handleError(error); // Use the custom error handler
            console.log(errorMessage)
            setMessage(errorMessage);
            showErrorToast(errorMessage)
            // localStorage.removeItem('authToken')
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

    // Animation for info cards
    const InfoCard = ({ icon: Icon, title, value, delay }) => {
        const controls = useAnimation();
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
        });

        useEffect(() => {
            if (inView) {
                controls.start('visible');
            }
        }, [controls, inView]);

        return (
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 50 },
                }}
                transition={{ duration: 0.5, delay }}
                className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 dark:bg-slate-600 "
            >
                <Icon className="text-blue-500" size={24} />
                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">{value}</p>
                </div>
            </motion.div>
        );
    };

    return (
        <>
            {/* <h1>User data: {user}</h1> */}
            {status === 'loading'
                ?
                (
                    // <DashboardSckleton />
                    <h1 >hey there</h1>
                )
                : isAuthenticated ? (
                    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                        {console.log(user)}
                        <h1 className="text-3xl font-bold dark:text-darkText text-gray-900 mb-6">User Dashboard</h1>

                        {message && <p className="text-red-500 mb-4">{message}</p>}

                        <div className="flex flex-col lg:flex-row gap-6">
                            <motion.div
                                className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src={user.profilePicture || "/api/placeholder/150/150"}
                                        alt={user.username}
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
                                    <p className="text-gray-600 text-center">{user.about}</p>
                                    {/* <div className="flex items-center space-x-2 text-gray-500">
                                        <MapPin size={16} />
                                        <span>{user.location || "Not provided"}</span>
                                    </div> */}
                                </div>
                            </motion.div>

                            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoCard icon={User} title="Username" value={user.username} delay={0.1} />
                                <InfoCard icon={Mail} title="Email" value={user.email} delay={0.2} />
                                <InfoCard icon={Phone} title="Phone" value={user.phoneNumber || "Not provided"} delay={0.3} />
                                <InfoCard icon={Shield} title="Role" value={user.role ? user.role.roleName : "Not provided"} delay={0.4} />
                                <InfoCard
                                    icon={Calendar}
                                    title="Created Date"
                                    value={new Date(user.createdDate).toLocaleDateString()}
                                    delay={0.5}
                                />

                                <motion.div
                                    className="sm:col-span-2 bg-white p-6 rounded-lg shadow-md"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Status</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className={`w-4 h-4 rounded-full ${user.enabled ? 'bg-green-500' : 'bg-red-500'}`}
                                            ></div>
                                            <span>{user.enabled ? 'Enabled' : 'Disabled'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {user.emailVerified ? (
                                                <CheckCircle className="text-green-500" />
                                            ) : (
                                                <XCircle className="text-red-500" />
                                            )}
                                            <span>Email {user.emailVerified ? 'Verified' : 'Not Verified'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {user.phoneVerified ? (
                                                <CheckCircle className="text-green-500" />
                                            ) : (
                                                <XCircle className="text-red-500" />
                                            )}
                                            <span>Phone {user.phoneVerified ? 'Verified' : 'Not Verified'}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // <DashboardSckleton />
                    <h1>{message || "Please log in to view your profile."}</h1>
                )}

        </>
    );
};

export default UserDashboard;
