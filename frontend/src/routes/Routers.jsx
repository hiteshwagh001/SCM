import { Navigate, Route, Routes } from "react-router-dom";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import OAuth2RedirectHandler from "../components/OAuth2RedirectHandler";

// Authentication check utility
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');  // Check if token exists
  return !!token; // Returns true if token exists, otherwise false
};

// Protected route component
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />


      {/* Protected route: redirect to login if user is not authenticated */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
