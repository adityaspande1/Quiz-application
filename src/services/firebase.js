import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyBK4uPsdJcmocc76cnPTiRPkRKWNWqW9pE",
  authDomain: "quiz-e489b.firebaseapp.com",
  projectId: "quiz-e489b",
  storageBucket: "quiz-e489b.firebasestorage.app",
  messagingSenderId: "100146255765",
  appId: "1:100146255765:web:a77c770b32ca6fd6fb889c"
};


  const app =initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db= getFirestore(app);
  export default app;

  



