import React from "react";

import UploadButton from "../../components/UploadButton";
import "./style.css";


const Home = () => {
    return (
        <div id="home">
            <h1 id="Name">Welcome to VirtuHire</h1>
            <h2>Please upload a CV to start the interview</h2>
            <UploadButton/>
        </div>
    );
};
 
export default Home;