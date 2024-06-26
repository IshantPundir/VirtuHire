import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// import axios from 'axios';

import "./style.css";
import ChatBubble from "../../components/ChatBubble";
import SendIcon from "../../assets/send.svg";
import MikeIcon from "../../assets/mike.svg";
import LoadingRing from "../../components/LoadingRing";
import LoadingBar from "../../components/LoadingBar";

const ChatRoom = () => {
    const [chatLog, setChatLog] = useState([]);
    const [socket, setSocket] = useState(null);
    const [started, setStarted] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [message, setMessageText] = useState("");

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        console.log("Connecting to VirtuHire websocket;");
        // TODO: Change lobby with CV id;
        const _socket = new WebSocket(
            `ws://127.0.0.1:8000/ws/virtuhire/lobby/?token=${localStorage.getItem('virtuhire_access_token')}`
        );
        // const _socket = new WebSocket(
        //     'ws://127.0.0.1:8000/ws/virtuhire/lobby'
        // );
        console.log("Connected to VirtuHire");
        setSocket(_socket);
    }, []);

    useEffect(() => {
        if (socket) {
            console.log("Socket is connected!");
            socket.onmessage = (e) => {
                const data = JSON.parse(e.data);
                console.log("Message from virtuHire: ", data);
                setChatLog(chatLog => [...chatLog, { virtuHire: true, response: data }]);
                if (!started) {
                    setStarted(true);
                }
            };
        }
    }, [socket, setChatLog, started]);


    useEffect(() => {
        setMessageText(transcript);
    }, [transcript])

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const startListening = () => {
        SpeechRecognition.startListening({
            continuous:true,
            language:'en-IN'
        });
    }


    const sendMessage = () => {
        if (message && socket) {
            console.log("Sending message to VirtuHire")
            setChatLog(chatLog => [...chatLog, { virtuHire: false, response:{"message":message} }]);
            socket.send(JSON.stringify({ 'message': message }));
            setMessageText("");
            resetTranscript();
            SpeechRecognition.stopListening();
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
                                        response={chat.response}
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
                        value={message}
                        onChange={(e) => setMessageText(e.target.value)}
                    />
                    <div id="action-buttons">
                        <img src={SendIcon} alt="Send Logo" onClick={sendMessage} />
                        <img src={MikeIcon} onClick={!listening?startListening:SpeechRecognition.stopListening} alt="Action Button" />
                    </div>
                </div>
                </>
            ):(<LoadingRing/>)
            }
            
        </div>
    );
};

export default ChatRoom;
