import React,{useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";
import { loadAdminAssets } from "../utils/loadAdminAssets";

const AdminLayout = () => {
    loadAdminAssets(); // ✅ Load admin assets on component mount
    // Manage sidebar toggle state
    const [isSidebarToggled, setIsSidebarToggled] = useState(
        localStorage.getItem("sb|sidebar-toggle") === "true"
    );

    useEffect(() => {
        // Apply class based on toggle state
        if (isSidebarToggled) {
            document.body.classList.add("sb-sidenav-toggled");
        } else {
            document.body.classList.remove("sb-sidenav-toggled");
        }
    }, [isSidebarToggled]);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarToggled((prev) => {
            const newState = !prev;
            localStorage.setItem("sb|sidebar-toggle", newState);
            return newState;
        });
    }; 
    
  return (
    <>
        <div className="sb-nav-fixed">
            <div id="layoutSidenav">
                <Header   toggleSidebar={toggleSidebar} />
                <Sidebar  isSidebarToggled={isSidebarToggled} />
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <Outlet />
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    </>
  );
};

export default AdminLayout;
