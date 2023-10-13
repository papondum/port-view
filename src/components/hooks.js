import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebase } from "../firebase";

import { useState, useEffect } from "react";

export function useUser() {
  const auth = getAuth(firebase);
  const [hasUser, setHasUser] = useState();
  const [sign, setSign] = useState(false)

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setHasUser(user);
      } else {
        setHasUser()
        console.log("No auth");
      }
    });

    return () => {};
  }, [sign]);
  async function _signout(){
    try {
    const res = await signOut(auth)
    console.log(res,':sign-out succesfull')
    setSign(false);
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(()=>{
    if(sign) {
      _signout()
    }
  },[sign])

  return [hasUser, setSign];
}

export async function userSignOut() {
  const auth = getAuth(firebase)


}
