import React from "react";
import "./style.css";

const ChatBubble = ({key, author, message}) => {
  const isVirtuHire = author === "VirtuHire";

  const bubbleStyle = {
    justifyContent: isVirtuHire ? "flex-start" : "flex-end",
  };
  const boxStyle = {
    backgroundColor: isVirtuHire ? "#009E3F": "#9E0098",
    borderRadius: isVirtuHire ? "50px 50px 50px 5px": "50px 50px 5px 50px"
  };

  return (
    <div id="bubble" style={bubbleStyle}>
      <div id="box" style={boxStyle}>
        <h1>{message}</h1>
      </div>
    </div> 
  );
};

export default ChatBubble;
