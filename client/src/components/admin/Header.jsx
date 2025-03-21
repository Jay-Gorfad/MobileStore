import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Header = ({toggleSidebar}) => {
    
  const [search, setSearch] = useState("");
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark sb-sidenav-dark">
        <Link className="navbar-brand ps-3" to="/admin" style={{ color: "white", textDecoration: "none" }}>
  MobiTrendz
</Link>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" id="btnNavbarSearch" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/admin/my-profile">
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/login">
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
  )
}

export default Header