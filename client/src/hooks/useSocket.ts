"use client";

import { useEffect, useState } from "react";
import socketIO, { Socket } from "socket.io-client";

// Tạo custom hook useSocket
const UseSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Khởi tạo kết nối socket
    const socketInstance = socketIO(
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "http://localhost:8000",
      { transports: ["websocket"] }
    );
    setSocket(socketInstance);

    // Dọn dẹp khi hook bị unmount
    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, []);

  return socket;
};

export default UseSocket;
