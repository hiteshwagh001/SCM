import React from "react";

import Routes from "../../routes/Routers.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";


const Layout = () => {

  return (
    < >
      <Header />
      {/* <div> */}
        <Routes />
      {/* </div> */}
      <Footer />

    </>
  );
};

export default Layout;
