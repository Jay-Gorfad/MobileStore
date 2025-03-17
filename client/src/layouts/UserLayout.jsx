import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { loadUserAssets } from "../utils/LoadUserAssets";

const UserLayout = () => {
	loadUserAssets(); // ✅ Load CSS & JS on app start
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default UserLayout;
