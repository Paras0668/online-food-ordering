
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

function SocketConnection() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      setConnected(true);
      console.log("Connected to CraveCart server:", socket.id);
    });

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("Disconnected from CraveCart server");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        padding: "12px",
        margin: "12px",
        borderRadius: "8px",
        background: connected ? "#dcfce7" : "#fee2e2",
        color: connected ? "#166534" : "#991b1b",
      }}
    >
      Real-Time Server: {connected ? "Connected" : "Disconnected"}
    </div>
  );
}

export default SocketConnection;
