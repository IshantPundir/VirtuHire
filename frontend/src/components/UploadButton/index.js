import React, { useState } from "react";
import icon from "../../assets/upload.svg";
import "./style.css";

const UploadButton = ({callback}) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    fullPath: "",
  });

  const handleFileChange = (event) => {
    // Select a file.
    const file = event.target.files[0];
    if (file) {
        // TODO: Upload the file to server.
        const fullPath = URL.createObjectURL(file); // Get full path
        
        setIsFileUploaded(true);
        setSelectedFile({ file, fullPath });
    }
  };

  const submitFile = (event) => {
    if (isFileUploaded) {
        callback(selectedFile.fullPath);
    }
  }

  return (
    <div id="button-container">
        <label id="button" onClick={submitFile}>
            <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                disabled={isFileUploaded}
            />
            <h1>{isFileUploaded ? "Start" : "Upload"}</h1>
            {!isFileUploaded && (
                <img src={icon} alt="Upload Logo" />
            )}

        </label>
        {isFileUploaded && (
            <p>File: {selectedFile.file.name}</p>
        )}
    </div> 
  );
};

export default UploadButton;
