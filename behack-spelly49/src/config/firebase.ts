// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLHQBBU7Kx2yzLKnljy0gLrMuICXva-nA",
  authDomain: "seat-at-the-table-d807d.firebaseapp.com",
  projectId: "seat-at-the-table-d807d",
  storageBucket: "seat-at-the-table-d807d.firebasestorage.app",
  messagingSenderId: "394486260563",
  appId: "1:394486260563:web:6859fa64fea88cb0c5b7a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, analytics, db, auth, storage }; 