import React, { useEffect } from "react";
import Card from "../component/Card";
function Signup() {
  const data = {
    heading: "Sign up",
    subheading: "Enter your infomation to create an account",
    inputs: ["First Name", "Last Name", "Email/Username", "Password"],
    button: "Sign Up",
    text: "Already have an account?",
    txtButton: "SignIn",
  };

  const submitting = () => {};
  return (
    <div className="flex justify-center items-center h-full">
      <Card data={data} />
    </div>
  );
}

export default Signup;
