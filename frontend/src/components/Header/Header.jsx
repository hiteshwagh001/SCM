import { LogIn, Menu, Moon, SquarePlus, Sun, User, UserRoundPen, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import UserLogout from '../fragments/UserLogout'
import { toggleTheme } from '../../store/Slices/themeSlice';


const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/pizzas",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];


const Header = ({ onSidebarToggle }) => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const user = useSelector((state) => state.user.user)

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get the current theme from Redux

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="light dark:bg-gradient-to-r from-slate-800 to-slate-900 text-gray-800 dark:text-white shadow-lg  transition-colors duration-300  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Website Icon */}
          <div className=" flex flex-shrink-0" onClick={() => navigate("/")}>
          <button
              className="md:hidden mr-2 p-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
              onClick={() => onSidebarToggle(prev => !prev)} // Toggle sidebar on click
            >
              Hey
            </button>
            <img className="h-8 w-8 transition-transform duration-300 hover:scale-110" src={logo} alt="Website Logo" />
          </div>

          {/* Middle - Navigation Buttons (hidden on mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side - Theme Changer and User Profile */}
          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleTheme())} // Dispatch theme toggle action
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 mr-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>

            {/* User Profile Button and Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                {user && user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="User profile"
                    className="h-10 w-10 rounded-full object-cover"
                  // onError={(e) => e.target.src = 'default_profile_pic_url'} // Fallback image if profilePic fails to load
                  />
                ) : (
                  <User className="h-6 w-6 text-gray-500" />
                )}
              </button>


              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-white border-b border-gray-200 dark:border-gray-600">
                    <p className="font-medium">{user && user.username ? user.username : ""}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user && user.email ? user.email : null}</p>
                  </div>
                  {!isAuthenticated
                    ? <>
                      <div onClick={() => navigate("/signup")} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                        <SquarePlus className="inline-block mr-2" size={16} /> Signup
                      </div>
                      <div onClick={() => navigate("/login")} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                        <LogIn className="inline-block mr-2" size={16} /> Sign In
                      </div>
                    </>

                    :
                    <>
                      <div onClick={() => navigate("/user/dashboard")} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                        <UserRoundPen className="inline-block mr-2" size={16} />
                        Dashboard
                      </div>
                      <UserLogout />
                    </>
                  }
                </div>
              )}
            </div>

            {/* Hamburger menu button (visible on mobile) */}
            <div className="md:hidden ml-2">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-300"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {nav__links.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {item.display}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
