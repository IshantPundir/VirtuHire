import React, { useState, useEffect } from "react";
import icon from "../../assets/play.svg";
import "./style.css";

const ChatBubble = ({ virtuHire, response, speaking, setSpeaking }) => {
  const [audioPlayer, setAudioPlayer] = useState(null);

  const bubbleStyle = {
    justifyContent: virtuHire ? "flex-start" : "flex-end",
  };

  const boxStyle = {
    backgroundColor: virtuHire ? "#009E3F" : "#9E0098",
    borderRadius: virtuHire ? "50px 50px 50px 5px" : "50px 50px 5px 50px",
    textAlign: virtuHire ? "left" : "right",
  };

  const playAudio = () => {
    if (speaking) {
      console.log("Stopping audio!");
      setSpeaking(false);
      audioPlayer.pause();
    } else {
      console.log("Playing audio!");
      setSpeaking(true);

      const binaryAudio = atob(response.audio);
      const arrayBuffer = new ArrayBuffer(binaryAudio.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < binaryAudio.length; i++) {
        uint8Array[i] = binaryAudio.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: "audio/wav" });

      // Create an audio element
      const audioElement = new Audio();
      audioElement.src = URL.createObjectURL(blob);

      // Stop audio when audio is done playing!
      audioElement.onended = () => {
        console.log("Audio playback complete!");
        setSpeaking(false);
      };

      audioElement.play();

      // Set audio player reference for pause functionality
      setAudioPlayer(audioElement);
    }
  };

  useEffect(() => {
    // Automatically trigger playAudio if response.audio exists
    if (response.audio) {
      playAudio();
    }
  });


  return (
    <div id="bubble" style={bubbleStyle}>
      <div id="box" style={boxStyle}>
        <div>
          <h1>{virtuHire ? "VirtuHire" : "User"}</h1>
            {response.audio?(
              <img id="play-button" src={icon} alt="Play button" onClick={playAudio} />
            ):(<></>)}
        </div>
        <p>{response.message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;