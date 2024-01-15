import React, { useState, useEffect } from "react";
// import axios from 'axios';

import "./style.css";
import ChatBubble from "../../components/ChatBubble";
import SendIcon from "../../assets/send.svg";
import MikeIcon from "../../assets/mike.svg";
import LoadingRing from "../../components/LoadingRing";
import LoadingBar from "../../components/LoadingBar";

const ChatRoom = () => {
    const [messageText, setMessageText] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [socket, setSocket] = useState(null);
    const [started, setStarted] = useState(true);
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        console.log("Connecting to VirtuHire websocket;");
        const _socket = new WebSocket(
            'ws://127.0.0.1:8000/ws/virtuhire/lobby/'
            // 'ws://10.1.6.70:8000/ws/virtuhire/lobby/'
        );
        console.log("Connected to VirtuHire");
        setSocket(_socket);
    }, []);

    useEffect(() => {
        if (socket) {
            console.log("Socket is connected!");
            socket.onmessage = (e) => {
                const data = JSON.parse(e.data);
                console.log("Message from virtuHire: ", data);
                setChatLog(chatLog => [...chatLog, { virtuHire: true, message: data.message }]);
                if (!started) {
                    setStarted(true);
                }
            };
        }
    }, [socket, setChatLog, started]);

    const sendMessage = () => {
        if (messageText && socket) {
            console.log("Sending message to VirtuHire")
            setChatLog(chatLog => [...chatLog, { virtuHire: false, message: messageText }]);
            socket.send(JSON.stringify({ 'message': messageText }));
            setMessageText("");
        }
    }

    return (
        <div id="chat-room">
            {started?
            (
                <>
                <div id="chat-hitory" className="container">
                    <div id="chat-bubble-container">
                        {chatLog.map((chat, _) => (
                            <ChatBubble virtuHire={chat.virtuHire}
                                        message={chat.message}
                                        speaking={speaking}
                                        setSpeaking={setSpeaking}/>
                        ))}

                        {
                            speaking?(<LoadingBar id="loading-bar"/>):(<></>)
                        }
                    </div>

                </div>
                <div id="chat-input" className="container">
                    <textarea
                        type="text"
                        placeholder="Write your response here"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                    />
                    <div id="action-buttons">
                        <img src={SendIcon} alt="Send Logo" onClick={sendMessage} />
                        <img src={MikeIcon} alt="STT" />
                    </div>
                </div>
                </>
            ):
            (
                <LoadingRing/>
            )
            }
            
        </div>
    );
};

export default ChatRoom;
