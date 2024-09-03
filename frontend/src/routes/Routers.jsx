import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";

const Routers = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/" />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />

      
    </Routes>
  );
};

export default Routers;
