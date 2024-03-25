# MindMentor: AI Voicebot Mental Consultant 🤖
<img src="./MindMentor.png" width="200" height="200">

## Project Description
MindMentor is an AI-powered voicebot designed to offer mental health consultations. The voicebot aims to provide immediate, confidential support for individuals seeking mental well-being.

## Demo
<img src="./demo.png" width="50%" height="50%">

## Technologies Used
- Frontend: React, TypeScript, EM6
- Backend: FastAPI
- Voice Recognition and Response: ChatGPT, Eleven Labs
- APIs: OpenAI's Whisper

## MVP Features
- Voice Recognition
- Consultation

## Setup Instructions

### Clone the Repository
To get started, clone the repository to your local machine:
```
git clone https://github.com/amandaguan-ag/mindmentor.git
```

### Setup Backend

1. **Change directory into backend:**
   ```
   cd mindmentor/backend
   ```

2. **Setup Virtual Environment:**
   
   - Create a virtual environment:
     ```
     python3 -m venv venv
     ```
   - Activate the virtual environment:
     - On macOS/Linux:
       ```
       source venv/bin/activate
       ```
     - On Windows:
       ```
       source venv/Scripts/activate
       ```

3. **Upgrade PIP:**
   ```
   pip install --upgrade pip
   ```

4. **Install Python Packages:**
   - Install the required packages:
     ```
     pip install fastapi "uvicorn[standard]" python-multipart openai python-decouple
     ```
   - Alternatively, if you have a `requirements.txt` file:
     ```
     pip install -r requirements.txt
     ```

5. **Create Environment Variables:**
   - Create a `.env` file in the backend directory:
     ```
     touch .env
     ```
   - Add your API keys to the `.env` file:
     ```
     OPENAI_API_KEY=your-openai-api-key
     ELEVEN_LABS_API_KEY=your-eleven-labs-api-key
     ```

6. **Start the Backend Server:**
   - To start the server:
     ```
     uvicorn main:app
     ```
   - To start the server with hot reload:
     ```
     uvicorn main:app --reload
     ```
   - Verify the backend is running by visiting:
     ```
     http://localhost:8000/health
     ```

### Setup Frontend

1. **Change directory into frontend:**
   ```
   cd ../frontend
   ```

2. **Install Packages:**
   ```
   yarn install
   ```

3. **Build the Application:**
   ```
   yarn build
   ```

4. **Start the Frontend Server:**
   - In development mode:
     ```
     yarn start
     ```
   - Verify the frontend is running by visiting:
     ```
     http://localhost:3000
     ```

## License
This project is licensed under the MIT License 

## Acknowledgements
- OpenAI for their Whisper API
- Eleven Labs for their voice recognition technology

## Contact Information
For any further queries, please contact [Amanda Guan](mailto:ag.amandaguan@gmail.com).