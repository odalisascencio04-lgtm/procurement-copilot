"use client";

import { useState } from "react";
import { procurementAI } from "@/lib/ai/procurementAI";


interface Message {
  role: "user" | "assistant";
  content: string;
}



export default function ChatWindow() {


  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);



  async function sendMessage() {

    if (!input.trim()) return;


    const userInput = input;


    const userMessage: Message = {
      role: "user",
      content: userInput,
    };


    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);


    setInput("");

    setLoading(true);



    try {


      const aiReply =
        await procurementAI(userInput);



      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiReply,
        },
      ]);



    } catch (error) {


      console.error(
        "Chat error:",
        error
      );


      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong.",
        },
      ]);


    } finally {


      setLoading(false);


    }

  }





  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {

    if (e.key === "Enter") {

      sendMessage();

    }

  }





  return (

    <div
      className="
      flex
      h-[600px]
      flex-col
      rounded-2xl
      bg-white
      shadow
      "
    >


      <div
        className="
        flex-1
        space-y-4
        overflow-y-auto
        p-6
        "
      >


        {
          messages.map(
            (message, index) => (

              <div
                key={index}
                className={`
                rounded-xl
                p-4
                max-w-[80%]

                ${
                  message.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }
                `}
              >

                {message.content}

              </div>

            )
          )
        }



        {
          loading && (

            <div
              className="
              rounded-xl
              bg-gray-100
              p-4
              max-w-[80%]
              "
            >

              Thinking...

            </div>

          )
        }


      </div>





      <div
        className="
        flex
        gap-3
        border-t
        p-4
        "
      >


        <input

          value={input}

          onChange={
            (e) =>
              setInput(e.target.value)
          }

          onKeyDown={handleKeyDown}

          placeholder="Ask procurement questions..."

          className="
          flex-1
          rounded-xl
          border
          px-4
          py-3
          outline-none
          "

        />



        <button

          onClick={sendMessage}

          disabled={loading}

          className="
          rounded-xl
          bg-blue-600
          px-6
          text-white
          disabled:opacity-50
          "

        >

          Send

        </button>


      </div>


    </div>

  );

}