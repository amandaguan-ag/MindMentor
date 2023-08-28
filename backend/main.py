# uvicorn main:app
# uvicorn main:app --reload

# Main imports
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai


# Custom function imports
from functions.openai_requests import convert_audio_to_text, get_chat_response
from functions.database import store_messages, reset_messages


# Initiate App
app = FastAPI()


# CORS - Origins
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:3000",
]


# CORS - Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Check health
@app.get("/health")
async def check_health():
    return {"response": "healthy"}

# Reset message
@app.get("/reset")
async def reset_conversation():
    reset_messages()
    return {"message": "conversation reset"}

# Get audio
@app.get("/post-audio-get/")
async def post_audio():

    #Get saved audio
    audio_input = open("/Users/amandaguan/Desktop/Epicodus/chatbot/backend/voice.mp3", "rb")
    print(audio_input)
    # Decode audio
    message_decoded = convert_audio_to_text(audio_input)

    # Guard: Ensure output
    if not message_decoded:
        raise HTTPException(status_code=400, detail="Failed to decode audio")
    
    # Get chat response
    chat_response = get_chat_response(message_decoded)

    #store messages
    store_messages(message_decoded, chat_response)

    print(chat_response)

    return "Done"

# # Post bot response
# # Note: Not playing back in browser when using post request.
# @app.post("/post-audio/")
# async def post_audio(file: UploadFile = File(...)):

#     print("hello")