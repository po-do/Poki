importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);e3 
});

// importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js");

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("../firebase-messaging-sw.js")
//     .then(function (registration) {
//       console.log("Registration successful, scope is:", registration.scope);
//     })
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }

// firebase.initializeApp({
//   messagingSenderId: "815592199870",
// });

// const initMessaging = firebase.messaging();
