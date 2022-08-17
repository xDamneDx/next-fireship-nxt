import { useState, useEffect } from "react";
import { firestore, auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onSnapshot, doc } from "firebase/firestore";

const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Turn off realtime subscription:
    let unsubscribe;

    if (user) {
      const docRef = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(docRef, (snapshot) => {
        setUsername(snapshot.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
};

export { useUserData };
