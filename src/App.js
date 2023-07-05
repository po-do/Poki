import React, { useState, useEffect } from "react";
import Login from "./pages/General/Login";
import axios from "axios";
import io from "socket.io-client";
// foreground import
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

axios.defaults.withCredentials = true;
// export const socket = io("http://3.34.134.62:3000");
// export const socket = io("http://localhost:4000/chat");
// export const socket = io("http://localhost:4000/chat");
//export const socket = io("https://api.pokids.site:8000");
export const socket = io(process.env.REACT_APP_SOCKET_URL);

function App() {
  const [tokenFcm, setTokenFcm] = useState("");

  async function requestPermission() {
    try {
      // FCM 요청
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIRE_VAPID_KEY,
        });
      // console.log("token",token);
        setTokenFcm(token);
        // Send this token to server (db)
      } else if (permission === "denied") {
        alert("You denied the notification permission.");
      }
    } catch (error) {
      console.log("Error getting notification permission:", error);
      // Handle the error or retry the request
      // You can add a delay before retrying, if needed
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return <Login token={tokenFcm} />;
}

export default App;
