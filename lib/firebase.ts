import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fireship-nxt-c9283.firebaseapp.com",
  projectId: "fireship-nxt-c9283",
  storageBucket: "fireship-nxt-c9283.appspot.com",
  messagingSenderId: "778365406883",
  appId: "1:778365406883:web:38bfbbcb7d9df0a07db916",
};

// Init firebase:
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Init firestore:
const firestore = getFirestore();

// Init auth:
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();

// Init storage:
const storage = getStorage();

export { firestore, auth, googleAuthProvider, storage };
