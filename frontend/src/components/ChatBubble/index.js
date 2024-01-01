import React from "react";
import "./style.css";

const ChatBubble = ({key, virtuHire, message}) => {
  /*
  Styling based on author
  */
  const bubbleStyle = {
    justifyContent: virtuHire ? "flex-start" : "flex-end",
  };
  const boxStyle = {
    backgroundColor: virtuHire ? "#009E3F": "#9E0098",
    borderRadius: virtuHire ? "50px 50px 50px 5px": "50px 50px 5px 50px",
    textAlign: virtuHire? "left": "right"
  };

  return (
    <div id="bubble" style={bubbleStyle}>
      <div id="box" style={boxStyle}>
        <h1>{virtuHire?"VirtuHire":"User"}</h1>
        <p>{message}</p>
      </div>
    </div> 
  );
};

export default ChatBubble;
