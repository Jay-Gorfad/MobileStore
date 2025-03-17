import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Header = ({}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [query, setQuery] = useState("");
    const navigate = useNavigate();

	const validateSearch = (event) => {
		event.preventDefault();
		console.log("Search Query:", query);
	};
	const handleDoubleClick = () => {
		setIsLoggedIn((prev) => !prev);
	};
    const handleLogout = ()=>{
        alert("You are logged out successfully!");
        navigate("/");
    }
    
	return (
		<>
			{isLoggedIn ? (
				<nav
					id="navibar"
					className="navbar navbar-expand-lg navbar-light sticky-top container-fluid"
                    onDoubleClick={handleDoubleClick}
                    style={{backgroundColor:"#f8f9fa"}}
				>
					<div className="container-fluid">
						<button
							id="collapse-btn"
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarTogglerDemo01"
							aria-controls="navbarTogglerDemo01"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarTogglerDemo01"
						>
							<Link
								className="logo navbar-brand fs-1 fw-bold"
								to="/"
                                style={{color:"black"}}
							>
								MobiTrendz
							</Link>
							<ul className="links navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<NavLink className="nav-link" to="/">
										Home
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/shop">
										Shop
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/contact">
										Contact
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/about">
										About
									</NavLink>
								</li>
							</ul>

							<div className="d-flex justify-content-end align-items-center flex-sm-row flex-column">
								<div
									className="d-flex justify-content-end align-items-center not-hidden"
									id="SearchSection2"
								>
									<form
										className="d-flex justify-content-end"
										onSubmit={validateSearch}
									>
										<input
											className="search-input"
											type="search"
											placeholder="Search for items..."
											size="25"
											id="searchBar"
											name="search"
											value={query}
											onChange={(e) =>
												setQuery(e.target.value)
											}
										/>
										<button className="primary-btn me-3 search-button">
											<i
												className="fa fa-search"
												aria-hidden="true"
											></i>
										</button>
									</form>
								</div>

								<div className="d-flex justify-content-between align-items-center justify-content-sm-between w-100">
									<li className="nav-item dropdown profile-menu ms-lg-auto"  >
										<a
											className="nav-link dropdown-toggle"
											id="navbarLightDropdownMenuLink"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
                                            style={{backgroundColor:"#f8f9fa"}}
										>
											<img
												src="img/users/default-img.png"
												alt="User"
												style={{
													width: "45px",
													height: "45px",
													borderRadius: "50%",
													marginRight: "10px",
												}}
											/>
											Jay Gorfad
										</a>

										<ul
											id="pro-drop"
											className="dropdown-menu dropdown-menu-dark"
										>
											<li>
												<NavLink
													className="dropdown-item nav-link"
													to="/account"
												>
													My Profile
												</NavLink>
											</li>
											<li>
												<NavLink
													className="dropdown-item nav-link"
													to="/order-history"
												>
													Your Orders
												</NavLink>
											</li>
											<li>
												<button
													className="dropdown-item nav-link"
													onClick={handleLogout}
												>
													Log out
												</button>
											</li>
										</ul>
									</li>

									<div className="d-flex justify-content-end align-items-center justify-content-sm-center w-100">
										<Link
											to="/wishlist"
											className="icon-link"
										>
											<div className="icon me-1">
												<i className="fa-solid fa-heart primary"></i>
												<span className="badge-class bg-danger">
													2
												</span>
											</div>
										</Link>
										<Link to="/cart" className="icon-link">
											<div className="icon me-1">
												<i className="fa-solid fa-cart-shopping primary"></i>
												<span className="badge-class bg-danger">
													3
												</span>
											</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			) : (
				<nav
					id="navibar"
					className="navbar navbar-expand-lg navbar-light sticky-top container-fluid"
                    onDoubleClick={handleDoubleClick}
                    style={{backgroundColor:"#f8f9fa"}}
				>
					<div className="container">
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarTogglerDemo01"
							aria-controls="navbarTogglerDemo01"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse justify-content-between"
							id="navbarTogglerDemo01"
						>
							<Link
								className="logo navbar-brand fs-1 fw-bold"
								to="/"
                                style={{color:"black"}}
							>
								MobiTrendz
							</Link>
							<ul className="links navbar-nav mb-2 mb-lg-0 me-auto">
								<li className="nav-item">
									<NavLink className="nav-link" to="/">
										Home
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/shop">
										Shop
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/contact">
										Contact
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/about">
										About
									</NavLink>
								</li>
							</ul>

							<form className="d-flex flex-nowrap justify-content-end">
								<input
									className="search-input"
									type="search"
									placeholder="Search for items..."
									size="25"
								/>
								<button className="primary-btn me-3 search-button">
									<i
										className="fa fa-search"
										aria-hidden="true"
									></i>
								</button>
								<Link className="header-btn" to="/register">
									Register
								</Link>
								<Link className="header-btn" to="/login">
									Login
								</Link>
							</form>
						</div>
					</div>
				</nav>
			)}
		</>
	);
};

export default Header;
