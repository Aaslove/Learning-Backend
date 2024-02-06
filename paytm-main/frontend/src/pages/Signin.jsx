import React from "react";
import Card from "../component/Card";

function Signin() {
  const data = {
    heading: "Sign In",
    subheading: "Enter your credentials to access your account",
    inputs: ["Email/Username", "Password"],
    button: "Sign In",
    text: "Don't have a account?",
    txtButton: "SignUp",
  };
  return (
    <div className="flex justify-center items-center h-full">
      <Card data={data} />
    </div>
  );
}

export default Signin;
