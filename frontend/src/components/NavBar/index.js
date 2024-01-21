import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./style.css";


const NavBar = () => {    
    let navigate = useNavigate(); 
    const location = useLocation();

    // Determine the color based on the current route
    const getNavBarColor = () => {
        switch (location.pathname) {
        case "/profile":
            return "black";
        default:
            return "transparent";
        }
    };

    const routeChange = () =>{ 
        let path = `/login`; 
        navigate(path);
    }

    return (
        <div id="navbar" style={{backgroundColor:getNavBarColor()}}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div id="logo">
                    <img src="/logo.svg" alt="VirtuHire Logo" className="logo" />
                    <h1>VirtuHire</h1>
                </div>
            </Link>
            <div id="links">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>Home</h1>                
                </Link>

                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <h1>Profile</h1>
                </Link>

                <Link to="/chatroom" style={{ textDecoration: 'none' }}>
                    <h1>Launch</h1>
                </Link>
            </div>
            <div>
                <button id="account-button" onClick={routeChange}>
                    Login
                </button>
            </div>
        </div>
    );
};
 
export default NavBar;