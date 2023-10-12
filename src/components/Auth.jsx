import React, { useState } from "react";
import { firebase } from "../firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
function Auth() {
  const auth = getAuth(firebase);
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState();
  function _setPhone(e) {
    setnumber(e.target.value);
  }

  // Sent OTP
  const signin = async () => {
    if (mynumber === "" || mynumber.length < 10) return;

    let verify = new RecaptchaVerifier(auth, "recaptcha-container", {});

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+66" + mynumber,
        verify
      );
      if (confirmationResult) {
        setfinal(confirmationResult);
        alert("code sent");
        setshow(true);
      }
    } catch (error) {
      alert(error);
      window.location.reload();
    }
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };
  const renderSendOtp = (
    <>
      <input
        id="first"
        value={mynumber}
        className="border-b-2 p-2 border-sky-500"
        onChange={(e) => {
          setnumber(e.target.value);
        }}
        placeholder="phone number"
        style={{ color: "black" }}
      />
      <div id="recaptcha-container" />
      <button className="rounded-none p-4 bg-cyan-700" onClick={signin}>
        Send OTP
      </button>
    </>
  );
  const renderValidate = (
    <>
      <input
        id="second"
        value={otp}
        className="border-2 p-2 border-sky-500"
        placeholder={"Enter your OTP"}
        onChange={(e) => {
          setotp(e.target.value);
        }}
      />
      <button className="rounded-none p-4 bg-cyan-700" onClick={ValidateOtp}>
        Verify
      </button>
    </>
  );
  return (
    <div className="container h-full max-w-screen-sm shadow mx-auto px-4">
      <div className="w-5/12 h-full mx-auto py-8">
        <div className="h-full flex flex-col justify-around">
          {!show ? renderSendOtp : renderValidate}
          {/* {renderSendOtp}
          {renderValidate} */}
        </div>
      </div>
    </div>
  );
}

export default Auth;
