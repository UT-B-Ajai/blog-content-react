import { io } from "socket.io-client";

// Connect to the notifications namespace
const socket = io("http://localhost:5000/notifications", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Connected to Socket.io server:", socket.id);
});

export default socket;
