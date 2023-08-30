import requests
from decouple import config

# Get API Key from environment variables
ELEVEN_LABS_API_KEY = config("ELEVEN_LABS_API_KEY")

# Function to convert text to speech
def convert_text_to_speech(message):
  
    # Define the request body
    body = {
        "text": message,
        "voice_settings": {
            "stability": 0,
            "similarity_boost": 0
        }
    }

    # Define the voice to be used
    voice_rachel = "21m00Tcm4TlvDq8ikWAM"

    # Set up headers and endpoint
    headers = { 
        "xi-api-key": ELEVEN_LABS_API_KEY, 
        "Content-Type": "application/json", 
        "accept": "audio/mpeg" 
    }
    endpoint = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_rachel}"

    # Make the API request
    try:
      response = requests.post(endpoint, json=body, headers=headers)
    except Exception as e:
     return

    # Handle the API response
    if response.status_code == 200:
      return response.content
    else:
      return
