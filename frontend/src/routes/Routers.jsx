import { Navigate, Route, Routes } from "react-router-dom";
import OAuth2RedirectHandler from "../components/OAuth2RedirectHandler";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import Signup from "../pages/Signup";
import Test from "../pages/Test";
import AddContactPage from "../pages/AddContactPage";

// Authentication check utility
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken'); // Check if token exists
  return !!token; // Return true if token exists, otherwise false
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
      <Route path="/add-contact" element={<AddContactPage />} />
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="/test" element={<Test />} />

      {/* Grouping all protected user routes under /user */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="dashboard" element={<Profile />} />
              <Route path="setting" element={<Setting />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* Fallback route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
