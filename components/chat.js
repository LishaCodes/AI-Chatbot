import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Define the fetchChatResponse function
const fetchChatResponse = async (message) => {
  const response = await fetch("/api/openai", { // This should match your API route
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b", // or the model you are using
      messages: [
        { role: "user", content: message },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chat response");
  }

  return response.json();
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainer = useRef(null);

  const scroll = () => {
    if (chatContainer.current) {
      const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current;
      if (scrollHeight >= scrollTop + offsetHeight) {
        chatContainer.current.scrollTo(0, scrollHeight + 200);
      }
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add the user message
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    try {
      const response = await fetchChatResponse(input);
      if (response && response.choices && response.choices[0]) {
        // Add the AI response
        setMessages([...messages, { role: "user", content: input }, { role: "ai", content: response.choices[0].message }]);
      }
    } catch (error) {
      console.error("Error submitting chat:", error);
    }
  };

  const renderResponse = () => {
    return (
      <div className="response">
        {messages.map((m, index) => (
          <div
            key={index} // Use index if messages don't have a unique ID
            className={`chat-line ${
              m.role === "user" ? "user-chat" : "ai-chat"
            }`}
          >
            <Image
              className="avatar"
              alt="avatar"
              width={40}
              height={40}
              src={m.role === "user" ? "/user-avatar.jpg" : "/ai-avatar.png"}
            />
            <div style={{ width: "100%", marginLeft: "16px" }}>
              <p className="message">{m.content}</p>
              {index < messages.length - 1 && (
                <div className="horizontal-line" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div ref={chatContainer} className="chat">
      {renderResponse()}
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          name="input-field"
          type="text"
          placeholder="Say anything"
          onChange={handleInputChange}
          value={input}
        />
        <button type="submit" className="send-button" />
      </form>
    </div>
  );
};

export default Chat;
