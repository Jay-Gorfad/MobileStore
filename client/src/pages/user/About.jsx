import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const About = ({ content}) => {
  return (
    <div className="container sitemap mt-5">
      <p>
        <Link
            to="/"
            className="text-decoration-none dim link"
        >
            Home /
        </Link>{" "}
        About
      </p>
      <div className="about row justify-content-center">
        <div className="col-lg-12">
            <h2 className="mb-4 text-primary">About Us</h2>
            <p>
            Welcome to MobiTrendz, your premier destination for everything mobile. We specialize exclusively in mobile phones, bringing you the latest innovations in technology and design. Whether you're searching for the newest flagship smartphone, or expert advice on the best mobile devices, MobiTrendz is here to meet all your mobile needs.
            </p>
            <h2 className="mb-4 text-primary">Our Mission</h2>
            <p>
            At MobiTrendz, our mission is to empower you with the best in mobile technology. We believe that your mobile phone is more than just a device it is your gateway to the world, your personal assistant, your entertainment hub, and your connection to friends and family. That is why we are dedicated to providing a wide selection of high-quality mobile phones and accessories that cater to your unique lifestyle and needs.
            </p>
            <h2 className="mb-4 text-primary">Why Choose Us?</h2>
            <p>
            1. Exclusive Focus on Mobile: Unlike general electronics stores, we specialize exclusively in mobile technology. This focus allows us to offer an unmatched selection of mobile phones and accessories, ensuring that you find exactly what you are looking for. <br/><br/>

            2. Wide Range of Mobile Phones: From the latest flagship models from top brands like Apple, Samsung, and Google to budget-friendly alternatives, our catalog includes options for every type of user. Whether you're looking for a high-performance phone with cutting-edge features or a simple, reliable device, we have got it all.<br/><br/>

            3. Product Information: We know that choosing a new phone can be overwhelming. That is why we provide in-depth product descriptions, expert reviews, detailed specifications. Our goal is to make your decision-making process as easy and informed as possible.<br/><br/>

            4. Latest Technology and Trends: We stay on the cutting edge of mobile technology, offering the newest releases as soon as they hit the market. From 5G-enabled devices to foldable screens and advanced camera systems, you all find the latest innovations here.
            </p>
            <h2 className="mb-4 text-primary">Join Our Mobile Community</h2>
            <p>
            At MobiTrendz, we are more than just a store we are a community of mobile enthusiasts. Join us on social media, subscribe to our newsletter, and stay connected for the latest updates, exclusive offers, and expert tips on making the most of your mobile technology. We are here to keep you informed, inspired, and in touch with the latest trends and developments in the mobile world.
            </p>
            {/* <p>
                Our mission is to promote a healthier lifestyle by offering products that are free from 
                artificial preservatives and harmful additives. Whether you’re looking for fresh produce, 
                grocery essentials, or specialty vegetarian items, we’ve got you covered.
            </p>
            <p>
                At <strong>PureBite</strong>, customer satisfaction is our priority. We take pride in sourcing 
                products from trusted suppliers and ensuring that every item meets the highest standards of quality.
            </p>
            <p>
                Thank you for choosing <strong>PureBite</strong>. We look forward to serving you with the best 
                vegetarian products available!
            </p>
            <p>
                Our journey started with a simple vision – to make high-quality, vegetarian food accessible 
                to everyone. Over the years, we have built strong relationships with farmers and suppliers 
                who share our values of sustainability and ethical sourcing.
            </p>
            <p>
                We continuously strive to expand our product range, bringing you new and exciting vegetarian 
                options. From farm-fresh vegetables to ready-to-eat healthy meals, we are here to cater to all 
                your dietary needs.
            </p>
            <p>
                Connect with us on social media to stay updated with our latest products, offers, and healthy 
                eating tips. We love hearing from our customers and are always happy to assist you with any queries.
            </p> */}
        </div>
      </div>
    </div>
  );
};

export default About;
