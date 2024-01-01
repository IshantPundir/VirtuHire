import React, { useState } from "react";

import "./style.css";

import ChatBubble from "../../components/ChatBubble";
import SendIcon from "../../assets/send.svg";
import MikeIcon from "../../assets/mike.svg";

let chatlog = [
    {   
        'virtuHire': true,
        'message': 'Hello, Im VirtuHire, and I will be taking your interview.'
    },
    {
        'virtuHire': false,
        'message': 'Hello, Im Ishant Start Message'
    },
    {
        'virtuHire': true,
        'message': 'Hello, Ishant. Please share some information about you.'
    },
    {
        'virtuHire': false,
        'message': 'Hello, Im Ishant'
    },
    {
        'virtuHire': true,
        'message': 'Hello, Ishant. Please share some information about you.'
    },
    {
        'virtuHire': false,
        'message': 'Hello, Im Ishant'
    },
    {
        'virtuHire': true,
        'message': 'Hello, Ishant. Please share some information about you.'
    },
    {
        'virtuHire': false,
        'message': 'Hello, Im Ishant Last message'
    },
    {
        'virtuHire': true,
        'message': 'Hello, Ishant. Please share some information about you.'
    }
];

const ChatRoom = () => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = (event) => {
        if (messageText !== "") {
            console.log("Sending message");
            setMessageText("");
        }
    }

    return (
        <div id="chat-room">
            <div id="chat-hitory" className="container">
                <div id="chat-bubble-container">
                    {chatlog.map((chat, index) => (
                        <ChatBubble key={index} virtuHire={chat.virtuHire} message={chat.message} />
                    ))}
                </div>
            </div>
            <div id="chat-input" className="container">
                <textarea type="text"
                    placeholder="Write you response here"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}/>
                <div id="action-buttons">
                    <img src={SendIcon} alt="Send Logo" onClick={sendMessage}/>
                    <img src={MikeIcon} alt="STT" />
                </div>
            </div>
        </div>
    );
};
 
export default ChatRoom;