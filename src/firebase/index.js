// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW-oV08k0VvgaeX2Cl3TOOCvFuS_kf0pk",
  authDomain: "glengroup-3aa99.firebaseapp.com",
  databaseURL: "https://glengroup-3aa99-default-rtdb.firebaseio.com",
  projectId: "glengroup-3aa99",
  storageBucket: "glengroup-3aa99.appspot.com",
  messagingSenderId: "111969540950",
  appId: "1:111969540950:web:e9179b5c142d9c91cdd4f7",
  measurementId: "G-TMZ4H4BLLJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
