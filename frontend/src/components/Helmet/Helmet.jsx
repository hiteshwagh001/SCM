import React from "react";
import { useSelector } from "react-redux";

const Helmet = (props) => {
  const theme = useSelector(state => state.theme.theme)

  document.title = "SCM - " + props.title;
  return <div className={`
    h-screen m-auto
    ${theme === 'light' ? 'bg-lightBg text-lightText' : 'bg-darkBg text-darkText'}
    `}>
    {props.children}
  </div>;
};

export default Helmet;
