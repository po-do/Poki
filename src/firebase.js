import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp-LNOPGB0yOmSAO9OvbR1yj66hZWvESY",
  authDomain: "poki-ed4fb.firebaseapp.com",
  projectId: "poki-ed4fb",
  storageBucket: "poki-ed4fb.appspot.com",
  messagingSenderId: "815592199870",
  appId: "1:815592199870:web:598fb00494c87eecc170ef",
};

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
