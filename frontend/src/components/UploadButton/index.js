import React, { useState } from "react";
import axios from 'axios';

import icon from "../../assets/upload.svg";
import "./style.css";

function getCSRFToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    .split('=')[1];
  return cookieValue;
}

const UploadButton = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    fullPath: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const fullPath = URL.createObjectURL(file);
        setIsFileUploaded(true);
        setSelectedFile({ file, fullPath });
    }
  };

  const submitFile = (event) => {
    if (isFileUploaded && !isUploading) {
        setIsUploading(true);
        const csrfToken = getCSRFToken();
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.headers.common['X-CSRFTOKEN'] = csrfToken;

        const formData = new FormData();
        formData.append('file', selectedFile.file);
        formData.append('csrfmiddlewaretoken', csrfToken);

        axios.post('http://127.0.0.1:8000/cv_upload/upload/', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error uploading file: ', error);
            })
            .finally(() => {
                setIsUploading(false);
            });
    }
  }

  const clearFile = () => {
    setIsFileUploaded(false);
    setSelectedFile({ file: null, fullPath: "" });
  };

  return (
    <div id="button-container">
        <label id="button" onClick={submitFile}>
            <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                disabled={isFileUploaded || isUploading}
                accept=".pdf"
            />
            <h1>{isFileUploaded ? "Start" : "Upload"}</h1>
            {!isFileUploaded && !isUploading && (
                <img src={icon} alt="Upload Logo" />
            )}
            {isUploading && (
                <div className="loading-spinner"></div>
            )}
        </label>
        {isFileUploaded && (
            <div>
                <p>File: {selectedFile.file.name}</p>
                <button onClick={clearFile} disabled={isUploading}>
                    Clear
                </button>
            </div>
        )}
    </div> 
  );
};

export default UploadButton;
