import React from "react";

import LiveLogo from "../../components/LiveLogo";
import "./style.css";
import NavBar from "../../components/NavBar";

const Home = () => {
    return (
        <div id="home">
            <div id="background" style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1, // To place it behind other content
            }}>
                <LiveLogo/>
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 0,
                    backgroundColor: 'rgba(0,0,0, 0.4)'
                }}
                />
            </div>
            
            <NavBar id='nav-bar'/>

            <section>
                <h1>Welcome to VirtuHire</h1>
                <p>
                    Interview 1000s of candidates using conversational AI.
                </p>

                <button>
                    Get Started!
                </button>
            </section>
        </div>
    );
};
 
export default Home;