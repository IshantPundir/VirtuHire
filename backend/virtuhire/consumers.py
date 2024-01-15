import os
import json
import base64
from typing import Tuple

import torch
from loguru import logger
from transformers import AutoModelForCausalLM, AutoTokenizer
from channels.generic.websocket import WebsocketConsumer
from google.cloud import texttospeech

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/ishant/projects/VirtuHire/backend/credentials/google-cloud-key.json"

PROMPT = """
[INST]
You are VirtuHire, a AI based HR. Initiate the interview process for a potential candidate. The conversation will take place through a chat interface. Begin by asking essential introductory questions and gradually delve into a comprehensive assessment of their skills, experience, and cultural fit. Remember to maintain a professional and inclusive tone throughout the interaction. Encourage the candidate to provide detailed responses and ensure you cover key areas such as:

Introduction:

- Welcome the candidate and introduce VirtuHire as the AI HR interviewer.
Briefly explain the interview structure and set expectations for the chat-based conversation.
Personal Background:

- Inquire about the candidate's professional journey, starting from their educational background to their current role.
Explore any career gaps, transitions, or significant achievements.
Technical Competence:

- Assess their technical skills and knowledge relevant to the position.
Encourage the candidate to share specific examples of projects or tasks demonstrating their expertise.
Behavioral Questions:

- Pose situational and behavioral questions to gauge their problem-solving abilities, teamwork, and interpersonal skills.
Ask about experiences that highlight their adaptability and resilience.
Cultural Fit:

- Discuss the company culture and values.
Inquire about instances where the candidate has demonstrated alignment with these values in their previous roles.
Questions for VirtuHire:

- Allow the candidate to ask questions about the company, team, or role.
Provide thoughtful and informative responses.
Conclusion:
***
Summarize key takeaways from the chat-based interview.
Clearly communicate the next steps in the hiring process.
Remember to adapt the questions based on the specific role and industry. Maintain a conversational flow suitable for a chat interface and aim for an inclusive and positive experience for all candidates.
***
This is example conversation you might have with a candidate.
[VirtuHire]: Welcome to the interview, [Candidate Name]! I'm VirtuHire, your AI HR interviewer. How are you today?

[USER]: Hello VirtuHire! I'm [Candidate Name], and I'm doing well, thank you. Excited for the interview.

[VirtuHire]: Great to hear! Let's start by discussing your educational background. Could you tell me about your academic journey and how it led you to your current role?

[USER]: Certainly, VirtuHire. I completed my [Degree] at [University], and...

[...]

[VirtuHire]: That's insightful! Now, let's shift our focus to your technical skills. Can you share examples of projects where you've applied your expertise in [specific skill]?

[USER]: Absolutely. In my previous role at [Previous Company], I was responsible for...

[...]

[VirtuHire]: Impressive! Moving on to behavioral questions, can you narrate a situation where you faced a challenge and how you overcame it?

[USER]: Sure, VirtuHire. In a previous project...

[...]

[VirtuHire]: Thank you for sharing that. Now, let's discuss our company culture. Our values include [values]. How do you see yourself aligning with these values in your work?

[USER]: I value [similar values], and I have demonstrated this alignment by...

[...]

[VirtuHire]: That's great to hear. Now, it's your turn. Do you have any questions about our company or the role?

[USER]: Yes, VirtuHire. I'm curious about [specific aspect]...

[...]

[VirtuHire]: Excellent questions! Before we conclude, any final thoughts you'd like to share, [Candidate Name]?

[USER]: I appreciate the opportunity, VirtuHire. I believe my skills and experiences align well with the role, and I look forward to the possibility of contributing to [Company Name].

[VirtuHire]: Thank you, [Candidate Name]! We'll be in touch regarding the next steps. Have a great day!
[/INST]

[VirtueHire]: Hello, I'm VirtueHire, and I will be conducted your interview today, Can you please start by introducing youself.
"""

class Response:
    def __init__(self, message:str, audio:bytes|None) -> None:
        self._message = message
        self._audio = audio
    
    @property
    def message(self) -> str:
        return self._message

    @property
    def audio(self) -> bytes|None:
        return self._audio
class VirtuHire:
    def __init__(self, device:str='cuda', cv:str="Swastik_Dubey_resume_.pdf") -> None:
        self.prompt = PROMPT
        self.device = device

        # Initialize the tokenizer
        logger.debug('Loading tokeninzer')
        self.tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.1")
        logger.debug("Loading Mistral model.")
        self.model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.1", torch_dtype=torch.float16)
        self.model.to(self.device)
        
        # Setup prompt for CV
        self.setup_prompt(cv=cv)

        # Initialize TTS APIs.
        self.tts = texttospeech.TextToSpeechClient()

        # VirtuHire is ready to serve...
        logger.info("VirtuHire is ready!")
    
    def setup_prompt(self, cv:str) -> None:
        # TODO: Add cv data to prompt;
        ...

    def _get_audio(self, text:str) -> bytes|None:
        synthesis_input = texttospeech.SynthesisInput(text=text)
        # TODO: Make it configurable during initialization????
        voice = texttospeech.VoiceSelectionParams(
            language_code="en-IN", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
        )

        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )
        try:
            audio = self.tts.synthesize_speech(
                input=synthesis_input, voice=voice, audio_config=audio_config
            )
            return audio.audio_content

        except Exception as e:
            logger.error(f"ERRRO in TTS: {e}")
            return None
        
    def filter_response(self, response:str) -> str:
        response = response.split('[USER]')[0]
        return response.replace('</s>', '')
    
    def get_greet_response(self) -> Response:
        # send a greeting message
        greet_message = "Hello, I'm VirtueHire, and I will be conducting your interview today, Can you please start by introducing yourself"
        return Response(message=greet_message, audio=None)
        return Response(message=greet_message, audio=self._get_audio(greet_message))

    def ask(self, query:str) -> Response:
        logger.info(f"USER: {query}")

        # Add the query to the prompt.
        query = f"\n[INST][USER]: {query} [/INST]"
        self.prompt += query

        model_inputs = self.tokenizer([self.prompt], return_tensors="pt").to(self.device)
        generated_ids = self.model.generate(**model_inputs, max_new_tokens=500, do_sample=True)
        result = self.tokenizer.batch_decode(generated_ids)[0]
        
        # Get the latest response from the result.
        result = result.split(query)[-1]
        result = self.filter_response(result)


        # Update the prompt with the latest result.
        self.prompt += result

        logger.info(f"VirtuHire: {result}")
        audio = self._get_audio(result)

        response = Response(message=result, audio=audio)
        return response

class VirtuHireConsumer(WebsocketConsumer):
    def connect(self):
        print(f"New Connection established.")
        self.accept()
        self.virtuHire = VirtuHire()

        # send a greeting message
        greet_message = "Hello, I'm VirtueHire, and I will be conducted your interview today, Can you please start by introducing youself"
        # self.send(text_data=json.dumps({"message": greet_message}))
        self._send(self.virtuHire.get_greet_response())
        
    def disconnect(self, code):
        pass

    def _send(self, response:Response) -> None:
        self.send(text_data=json.dumps({
            "message": response.message,
            "audio": base64.b64encode(response.audio).decode('utf-8') if response.audio is not None else None
        }))

    def receive(self, text_data=None, bytes_data=None):
        print(f"New message recived from user: {text_data}")
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        response = self.virtuHire.ask(message)

        self._send(response)