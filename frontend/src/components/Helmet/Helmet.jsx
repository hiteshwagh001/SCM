import React from "react";

const Helmet = (props) => {
  document.title = "SCM - " + props.title;
  return <div className=" p-4 h-screen m-auto">{props.children}</div>;
};

export default Helmet;
