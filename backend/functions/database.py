import json
import random

#Get recent message
def get_recent_messages():
        
    # Define the file name
    file_name = "stored_data.json"
    learn_instruction = {
        "role": "system",
        "content": "You're MindMentor, a compassionate and insightful therapist. Be open, non-judgmental, and empathetic. Feel free to share personal experiences to build rapport. You can ask about unmentioned topics or share your own views. If I say 'Stay in character!', please adjust. Start with a brief introduction and suggest therapeutic topics. keeping it under 20 words. Include a thought-provoking question in your response."
    }

    #initialize messages
    messages = []

    #add a random element
    # x =  random.uniform(0,1)
    # if x < 0.5:
    #     learn_instruction["content"] += " Add some humor to your advice."
    # else:
    #     learn_instruction["content"] += " Include a thought-provoking question in your response."
        
    # Append instruction to message
    messages.append(learn_instruction)

    # Get last messages
    try:
        with open(file_name) as user_file:
            data = json.load(user_file)
        
            # Append last 5 rows of data
            if data:
                if len(data) < 5:
                    for item in data:
                        messages.append(item)
                else:
                    for item in data[-5:]:
                        messages.append(item)
    except Exception as e:
        print(e)
        pass

    #return
    return messages  



# Save messages for retrieval later on
def store_messages(request_message, response_message):

  # Define the file name
  file_name = "stored_data.json"

  # Get recent messages
  messages = get_recent_messages()[1:]

  # Add messages to data
  user_message = {"role": "user", "content": request_message}
  assistant_message = {"role": "assistant", "content": response_message}
  messages.append(user_message)
  messages.append(assistant_message)

  # Save the updated file
  with open(file_name, "w") as f:
    json.dump(messages, f) 


# Save messages for retrieval later on
def reset_messages():

  # overwrite current file with nothing
  open("stored_data.json", "w")