importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCM06te35Tjgkuur7cgf04Snqzy5WUnu6s",
  //프로젝트 설정 > 일반 > 하단의 내 앱 부분 복사
  authDomain: "poki-c90ad.firebaseapp.com",
  projectId: "poki-c90ad",
  storageBucket: "poki-c90ad.appspot.com",
  messagingSenderId: "313209790307",
  appId: "1:313209790307:web:23aa00b8b71edac4aa3d56",
  measurementId: "G-J2QB8LKF0P"
};

firebase.initializeApp(firebaseConfig);