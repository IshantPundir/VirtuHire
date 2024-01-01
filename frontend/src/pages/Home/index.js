import React from "react";

import UploadButton from "../../components/UploadButton";
import "./style.css";


const Home = () => {

    const fileUploaded = (fullPath) => {
        console.log("Uploading file: ", fullPath);
        
    }

    return (
        <div id="home">
            <h1 id="Name">Welcome to VirtuHire</h1>
            <h2>Please upload a CV to start the interview</h2>
            <UploadButton callback={fileUploaded}/>
        </div>
    );
};
 
export default Home;