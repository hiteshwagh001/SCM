import React from "react";
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png";
import useThemeClass from '../ThemeClass'


const footer_links = [
  {
    display: "About",
    path: "/about"
  },
  {
    display: "Privacy Policy",
    path: "/Privacy-Policy"
  },
  {
    display: "Licensing",
    path: "/Licensing"
  },
  {
    display: "Contact",
    path: "/Contact"
  },
]

const Footer = () => {
  const themeClass=useThemeClass()
  return (
    <footer className={` rounded-lg shadow ${themeClass} `}>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {footer_links.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className="hover:underline me-4 md:me-6">
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <Link to="/" className="hover:underline">Flowbite™</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
