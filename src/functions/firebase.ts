// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw5Xb8zE8qAAt-elXjWzuzgN-58YQM2KA",
  authDomain: "npo-nmd.firebaseapp.com",
  projectId: "npo-nmd",
  storageBucket: "npo-nmd.firebasestorage.app",
  messagingSenderId: "318960334876",
  appId: "1:318960334876:web:6d50dae72a07a3df8647d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
