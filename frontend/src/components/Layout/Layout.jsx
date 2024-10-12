import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Routes from "../../routes/Routers.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Function to toggle the sidebar (pass to Sidebar component)
  const handleSidebarToggle = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar className="sm:hidden" onSidebarToggle={handleSidebarToggle} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-16"
          }`} // Adjust margin-left based on sidebar state
      >
        <Header />
        <div >
          <Routes />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
