import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCK48Tn8l4qKw5rINuraQEwbJu0MU7pof4",
  authDomain: "travelpilot-6e508.firebaseapp.com",
  projectId: "travelpilot-6e508",
  storageBucket: "travelpilot-6e508.firebasestorage.app",
  messagingSenderId: "462114369331",
  appId: "1:462114369331:web:6211c8edee828ad7a71846",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;