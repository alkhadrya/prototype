// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZUUhzB9aqrELKQy0eSLQoAovipVDXaZ0",
  authDomain: "tdsi-blog-97e4e.firebaseapp.com",
  projectId: "tdsi-blog-97e4e",
  storageBucket: "tdsi-blog-97e4e.appspot.com",
  messagingSenderId: "361824917530",
  appId: "1:361824917530:web:bd979088e4ed3909bcd9a3",
  measurementId: "G-5MWWKGDBFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
