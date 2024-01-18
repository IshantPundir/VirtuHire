import React from "react";
import { Link } from "react-router-dom";

import "./style.css";


const NavBar = () => {
    return (
        <div id="navbar">
            <div id="logo">
                <img src="/logo.svg" alt="VirtuHire Logo" className="logo" />
                <h1>VirtuHire</h1>
            </div>
            <div id="links">
                {/* TODO: css styling and routing */}
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
                <button id="account-button">
                    Register
                </button>
            </div>
        </div>
    );
};
 
export default NavBar;