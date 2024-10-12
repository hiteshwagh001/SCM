import { useState, useEffect } from "react";
import { Home, User, Settings, Pin, PinOff, BadgePlus, Users } from "lucide-react"; // Icons
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onSidebarToggle }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        // Notify parent component (Layout) about sidebar state
        onSidebarToggle(isExpanded);
    }, [isExpanded, onSidebarToggle]);

    const handleMouseEnter = () => {
        if (!isPinned) setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        if (!isPinned) setIsExpanded(false);
    };

    const togglePin = () => {
        setIsPinned(!isPinned);
        setIsExpanded(!isPinned); // If pinned, keep it expanded
    };


    return (
        <div
            className={`dark:bg-gradient-to-r from-slate-800 to-slate-900 dark:text-darkText light h-screen transition-width duration-300 ${isExpanded ? "w-64" : "w-16"} fixed left-0 top-0 z-10`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="p-4 flex justify-between items-center">
                <span className="text-xl font-bold">
                    {isExpanded ? "Smart Contact Manager" : "SCM"}
                </span>
                {isExpanded && (
                    <button
                        onClick={togglePin}
                        className="p-2 hover:bg-gray-200 rounded transform transition-transform duration-300"
                    >
                        {isPinned ? <PinOff /> : <Pin />}
                    </button>
                )}
            </div>
            <div className="mt-10 space-y-4">
                <div onClick={() => navigate("/")} className="block p-4 hover:bg-gray-200 hover:m-3 rounded">
                    <Home className="inline-block mr-2" />
                    {isExpanded && <span>Home</span>}
                </div>
                <div onClick={() => navigate("user/dashboard")} className="block p-4 hover:bg-gray-200 hover:m-3 rounded">
                    <User className="inline-block mr-2" />
                    {isExpanded && <span>Profile</span>}
                </div>
                <div onClick={() => navigate("/add-contact")} className="block p-4 hover:bg-gray-200 hover:m-3 rounded">
                    <BadgePlus className="inline-block mr-2" />
                    {isExpanded && <span>Add Contact</span>}
                </div>

                <div onClick={() => navigate("/settings")} className="block p-4 hover:bg-gray-200 hover:m-3 rounded">
                    <Settings className="inline-block mr-2" />
                    {isExpanded && <span>Settings</span>}
                </div>
                <div onClick={() => navigate("/users")} className="block p-4 hover:bg-gray-200 hover:m-3 rounded">
                    <Users className="inline-block mr-2" />
                    {isExpanded && <span>Users</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
