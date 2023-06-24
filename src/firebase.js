import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  //프로젝트 설정 > 일반 > 하단의 내 앱 부분 복사
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: "poki-c90ad.firebaseapp.com",
  projectId: "poki-c90ad",
  storageBucket: "poki-c90ad.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIRE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_APP_ID,
  measurementId: process.env.REACT_APP_FIRE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
