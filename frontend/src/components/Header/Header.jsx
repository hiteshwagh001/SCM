import React, { useId } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import ThemeToggleButton from "../fragments/ThemeToggleButton";

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

export default function Header() {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <header className={`shadow`}>
      <nav
        className={`border-gray-200 ${theme === 'light' ? 'bg-lightBg text-darkText' : 'bg-darkBg text-lightText'}`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => navigate("/")}>
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </div>

          <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
            <ThemeToggleButton />

            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
            </button>

            {/* Dropdown */}
            <div className="z-50 hidden my-4 text-base list-none bg-darkBg divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-900 dark:divide-gray-600" id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li key="dashboard">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                </li>
                <li key="login">
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</Link>
                </li>
                <li key="sign-out">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>

            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ${theme === 'light' ? 'bg-lightBg text-darkText' : 'bg-darkBg text-lightText'}`}>
              {nav__links.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:md:text-blue-500" aria-current="page">
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
