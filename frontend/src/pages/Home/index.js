import React, { useEffect } from "react";

import UploadButton from "../../components/UploadButton";
import LiveLogo from "../../components/LiveLogo";
import "./style.css";


const Home = () => {
    useEffect(() => {
        
    }, []);

    return (
        <div id="home">

            <div id="Background" style={{ width: '100vw', height: '100vh' }}>
                <LiveLogo style={{ width: '100vw', height: '100vh' }}/>
            </div>
        </div>
    );
};
 
export default Home;