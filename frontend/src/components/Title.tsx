import { useState } from "react";
import axios from "axios";

type Props = {
  setMessages: any;
};

function Title({ setMessages }: Props) {
  const [isResetting, setIsResetting] = useState(false);

  // Reset conversation
  const resetConversation = async () => {
    setIsResetting(true);

    await axios.get("http://localhost:8000/reset").then((res)=>{
      if (res.status == 200){
        setMessages([])
      }
    })
    .catch((err)=> {
      console.error(err.message)
    });

    setIsResetting(false);
  }
  return (
    <div>
      <button onClick={resetConversation} className="bg-indigo-500">RESET</button>
    </div>
  );
}

export default Title;
