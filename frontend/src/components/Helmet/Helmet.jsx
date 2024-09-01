import React from "react";
import { useSelector } from "react-redux";
import useThemeClass from "../ThemeClass";

const Helmet = (props) => {
  const themeClass=useThemeClass()

  document.title = "SCM - " + props.title;
  return <div className={`
    h-screen m-auto
    ${themeClass}`}>
    {props.children}
  </div>;
};

export default Helmet;
