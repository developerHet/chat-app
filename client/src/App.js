import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chat, setChat] = useState(false);

  const handleJoin = () => {
    if (username !== "" && room !== "") {
      socket.emit("JOIN_ROOM", room);
      setChat(true);
    }
  };
  return (
    <div className="App">
      {!chat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            value={username}
            type="text"
            placeholder="Het..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={room}
            type="text"
            placeholder="Room ID..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleJoin}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
