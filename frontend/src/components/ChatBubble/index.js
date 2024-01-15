import React, {useEffect} from "react";
import Speech from 'react-speech';

// import icon from "../../assets/play.svg";

import "./style.css";

const ChatBubble = ({virtuHire, message, speaking, setSpeaking}) => {
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


  /* TTS */
  const msg = new SpeechSynthesisUtterance()
  msg.text = message

  useEffect(() => {
    console.log("Playing audio...")
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg)
    console.log("Done!", window.speechSynthesis.speaking);
  }, [msg])

  // const playAudio = () => {
  //   if (speaking) {
  //     console.log("Playing audio already");
  //     setSpeaking(false);
  //   }
  //   else {
  //     console.log("Playing audio");
  //     setSpeaking(true);
  //   }
  // }

  return (
    <div id="bubble" style={bubbleStyle}>
      {/* <img id="play-button" src={icon} alt="Play button" onClick={playAudio}/> */}
      {/* <Speech text="Welcome to react speech" displayText={true} textAsButton={true}/>     */}
      <div id="box" style={boxStyle}>
        <h1>{virtuHire?"VirtuHire":"User"}</h1>
        <p>{message}</p>
      </div>
    </div> 
  );
};

export default ChatBubble;
