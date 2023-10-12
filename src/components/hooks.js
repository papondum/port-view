import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase } from "../firebase";

import { useState, useEffect } from "react";

export function useUser() {
  const auth = getAuth(firebase);

  const [hasUser, setHasUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setHasUser(user);
      } else {
        console.log("Nope");
      }
    });

    return () => {};
  });

  return hasUser;
}
