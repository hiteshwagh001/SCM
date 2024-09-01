import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";



const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/" />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />

      
    </Routes>
  );
};

export default Routers;
