# VirtuHire

VirtuHire is an innovative web application powered by LLM (Large Language Model) technology, designed to streamline the hiring process for companies using the power of AI. With VirtuHire, companies can conduct interviews efficiently, saving time and resources, while ensuring a thorough evaluation of candidates.

## Features

- **Company Profile Creation**: Companies can create their profiles, providing details about their organization and job descriptions.
- **Interactive AI Interviewer**: VirtuHire serves as an interactive AI interviewer, conducting interviews and assessing candidate suitability based on company requirements.

## Project Structure

VirtuHire is organized into two main directories:

- **backend**: Built with Django, this directory contains the backend logic and API endpoints.
- **frontend**: Developed with React, the frontend directory houses the user interface components.

## Getting Started

Follow these steps to set up and run VirtuHire locally:

### Prerequisites

- [Anaconda](https://www.anaconda.com/products/distribution) for creating and managing virtual environments.

### Installation

1. **Create Virtual Environment**:
   ```bash
   conda create --name virtuhire_env python=3.8
   conda activate virtuhire_env
   ```

2. **Install Backend Requirements**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Install Frontend Requirements**:
   ```bash
   cd frontend
   npm install
   ```

### Launching the Application

1. **Launch Backend**:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Launch Frontend**:
   ```bash
   cd frontend
   npm start
   ```

## Current Status and Future Plans

- **Minimum Viable Product (MVP)**: The current version of VirtuHire is an MVP with basic functionality.
- **User Authentication**: Implemented for secure access to VirtuHire.
- **Company Profile and Job Description**: Incomplete feature, currently hard-coded in the backend.
- **CV Upload**: Users can upload their CVs via the frontend.
- **Voice Interaction**: VirtuHire supports text-to-speech (TTS) and speech-to-text (STT) for conversational interviews.
- **3D Character Persona**: Future enhancement planned to enhance user experience.