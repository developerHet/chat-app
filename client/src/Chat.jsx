import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({ socket, room, username }) {
  const [cMessage, setCMessage] = useState();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (cMessage !== "") {
      const msgObj = {
        message: cMessage,
        author: username,
        room: room,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("SEND_MESSAGE", msgObj);
      setMessageList((prevList) => [...prevList, msgObj]);
      setCMessage("");
    }
  };
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={cMessage}
          placeholder="Hey..."
          onChange={(e) => setCMessage(e.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
