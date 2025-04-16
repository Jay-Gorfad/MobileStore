import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const About = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const res = await axios.get("http://localhost:8000/about-page");
        setContent(res.data.data.content); // Accessing the content properly
      } catch (error) {
        console.error("Failed to fetch about content", error);
      }
    };

    fetchAboutContent();
  }, []);

  if (!content) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container sitemap mt-5">
      <p>
        <Link to="/" className="text-decoration-none dim link">
          Home /
        </Link>{" "}
        About
      </p>
      <div className="about row justify-content-center">
        <div className="col-lg-12">
          <h2 className="mb-4 text-primary">About Us</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default About;
