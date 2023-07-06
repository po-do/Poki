// useNotification.js
import { useEffect, useState } from "react";
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";

export function useNotification() {
  const [tokenFcm, setTokenFcm] = useState("");

  async function requestPermission() {
    // console.log('requestPermission 호출')
    try {
      // FCM 요청
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIRE_VAPID_KEY,
        });
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

    const unsubscribe = onMessage(messaging, (payload) => {
      // console.log("Message received in the foreground: ", payload);

      // Create and display a browser notification
      if (Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/logo192.png",
          // you can add more options here if needed
        });
      }
    });

    return unsubscribe;
  }, []);
}
