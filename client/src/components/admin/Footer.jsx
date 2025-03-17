import React from "react";
import { ToastContainer } from "react-toastify";

const Footer = () => {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright &copy; PureBite 2024</div>
        </div>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
