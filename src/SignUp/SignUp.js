import React, { useState } from "react";
import axios from "axios";
import dh from "../DocumentHelpers";
import endpoints from "../Endpoints";

const SignUp = () => {
  const [signUpDisabled, setSignUpDisabled] = useState(true);

  const handleInteraction = () => {
    const password = dh.getInputValue("password");
    const confirmPassword = dh.getInputValue("confirmPassword");
    const passwordsMatch =
      password !== "" && confirmPassword !== "" && password === confirmPassword;

    const username = dh.getInputValue("username");
    const email = dh.getInputValue("email");
    const formValid = username && email && passwordsMatch;

    setSignUpDisabled(!formValid);
  };

  const handleSignUp = () => {
    const formData = {
      username: dh.getInputValue("username"),
      email: dh.getInputValue("email"),
      password: dh.getInputValue("password"),
    };

    axios.post(endpoints.v1.users, formData);
    // .then((response) => {
    //   console.log("Sign Up Successful!");
    // })
    // .catch((error) => {
    //   console.error("Sign Up Failed!", error);
    // });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username" onChange={handleInteraction}></input>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" onChange={handleInteraction}></input>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" onChange={handleInteraction}></input>
      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        id="confirmPassword"
        type="password"
        onChange={handleInteraction}
      ></input>
      <button disabled={signUpDisabled} onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
