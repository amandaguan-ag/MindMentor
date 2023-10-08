import { useState } from "react";
import Title from "./Title";
import axios from "axios";
import RecordMessage from "./RecordMessage";
import WelcomePage from "./WelcomePage";

function Controller() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isWelcomePage, setIsWelcomePage] = useState(true);
  const [name, setName] = useState("invalid name")

  function createBlobURL(data: any) {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  }

  const handleStop = async (blobUrl: string) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];

    // convert blob url to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct audio to send file
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        // send form data to api endpoint
        await axios
          .post("http://localhost:8000/post-audio", formData, {
            headers: {
              "Content-Type": "audio/mpeg",
            },
            responseType: "arraybuffer", // Set the response type to handle binary data
          })
          .then((res: any) => {
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobURL(blob);

            // Append to audio
            const rachelMessage = { sender: "rachel", blobUrl: audio.src };
            messagesArr.push(rachelMessage);
            setMessages(messagesArr);

            // Play audio
            setIsLoading(false);
            audio.play();
          })
          .catch((err: any) => {
            console.error(err);
            setIsLoading(false);
          });
      });
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <Title setMessages={setMessages} />
      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        {isWelcomePage ? (
          <div>
            <WelcomePage
              setUserName={setName}
              setWelcomePage={setIsWelcomePage}
            />
          </div>
        ) : (
          <div className="mt-5 px-5">
            {messages.map((audio, index) => {
              return (
                <div
                  key={index + audio.sender}
                  className={
                    "flex flex-col" +
                    (audio.sender == "rachel" && "flex items-end")
                  }
                >
                  {/* Sender */}
                  <div className="mt-4">
                    <p
                      className={
                        audio.sender == "rachel"
                          ? "text-right mr-2 italic text-green-500"
                          : "ml-2 italic text-blue-500"
                      }
                    >
                      {audio.sender}
                    </p>
                    {/* Audio Message */}
                    <audio
                      src={audio.blobUrl}
                      className="appearance-noen"
                      controls
                    ></audio>
                  </div>
                </div>
              );
            })}
            {messages.length == 0 && !isLoading && (
              <div className="text-center font-light italic mt-10">
                Hi, {name}! my name is MindMentor. As for suggestions on what we can talk about, perhaps you could start by telling me a little bit about yourself and what brings you to
                therapy today? From there, we can explore any challenges or concerns you may be experiencing and work towards finding solutions together....
              </div>
            )}
            {isLoading && (
              <div className="text-center font-light italic mt-10 animate-pulse">
                Gimme a few second..
              </div>
            )}
          </div>
        )}

        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-sky-500 to-green-500">
          <div className="flex justify-center items-center w-full">
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controller;
