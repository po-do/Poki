importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCp-LNOPGB0yOmSAO9OvbR1yj66hZWvESY",
  authDomain: "poki-ed4fb.firebaseapp.com",
  projectId: "poki-ed4fb",
  storageBucket: "poki-ed4fb.appspot.com",
  messagingSenderId: "815592199870",
  appId: "1:815592199870:web:598fb00494c87eecc170ef",
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

  self.registration.showNotification(notificationTitle, notificationOptions);
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
