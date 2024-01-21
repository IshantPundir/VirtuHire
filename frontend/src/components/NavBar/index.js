import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./style.css";


const NavBar = () => {    
    const [isAuth, setIsAuth] = useState(false);
    
    useEffect(() => {
        if (localStorage.getItem('virtuhire_access_token') !== null) {
           setIsAuth(true); 
         }
       }, [isAuth]);

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

    const routeChange = () => { 
        let path = `/login`; 
        navigate(path);
    }

    const logout = async () => {
        console.log("Logging out...");
        console.log(localStorage.getItem('virtuhire_refresh_token'));
        await axios.post('http://127.0.0.1:8000/logout/',
            { refresh_token:localStorage.getItem('virtuhire_refresh_token') },
            { headers: {'Content-Type': 'application/json'} },  
            { withCredentials: true }
            )
            .then((response) => {
                console.log("Logged out successfully");
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                setIsAuth(false);
            })
            .catch((error) => {
                console.log("Error while logging out");
            })
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
                <button id="account-button" onClick={isAuth?logout:routeChange}>
                    {isAuth?"Logout":"Login"}
                </button>
            </div>
        </div>
    );
};
 
export default NavBar;