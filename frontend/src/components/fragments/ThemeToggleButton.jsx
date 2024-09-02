// src/components/ThemeToggleButton.js
import React from 'react';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/Slices/themeSlice';


const ThemeToggleButton = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);

    const icon = theme === 'light' ? <CiLight className='text-black '/>    :  <MdDarkMode className='text-gray-400'/>;
    const className = theme === 'light' ? 'p-4 text-2xl ' : 'p-4 text-2xl ';

    return (
        <div className={className} onClick={() => dispatch(toggleTheme())}>
            {icon}
        </div>
    );
};

export default ThemeToggleButton;