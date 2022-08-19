import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  Timestamp,
} from "firebase/firestore";
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

// Helper Functions:

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */

const getUserWithUsername = async (username) => {
  const q = query(
    collection(firestore, "users"),
    where("username", "==", username)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
};

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
const postToJSON = (doc) => {
  const data = doc.data();

  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
};

// Convertting a Firestore timestamp to a number.
const fromMillis = Timestamp.fromMillis;

export {
  firestore,
  auth,
  googleAuthProvider,
  storage,
  getUserWithUsername,
  postToJSON,
  fromMillis,
};
