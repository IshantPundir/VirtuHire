import React from "react";

import "./style.css";

import ChatBubble from "../../components/ChatBubble";

let chatlog = [
    {   
        'virtuHire': true,
        'message': 'Hello, Im VirtuHire, and I will be taking your interview.'
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
    }
];

const ChatRoom = () => {
    return (
        <div id="chat-room">
            <div id="chat-hitory" className="container">
                {chatlog.map((chat, index) => (
                    <ChatBubble key={index} virtuHire={chat.virtuHire} message={chat.message} />
                ))}
            </div>
            <div id="chat-input" className="container">
                <textarea type="text" placeholder="Write you response here"></textarea>
                <div>Submit</div>
            </div>
        </div>
    );
};
 
export default ChatRoom;