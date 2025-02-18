import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { notifyError } from "../components/Error";
import { useSelector } from "react-redux";

export const useWebSocket = () => {
  const user = useSelector((state) => state.user.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000",{
			query: {
				userId: user?._id,
			},
		});
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (users) => {
			console.log(users);
		});

    newSocket.on("connect_error", (err) => {
      notifyError("server not resposnding");
      console.error("websocket not connected",err);
    });

    return () => newSocket.close(); // Cleanup on unmount
  }, []);

  return { socket };
};
