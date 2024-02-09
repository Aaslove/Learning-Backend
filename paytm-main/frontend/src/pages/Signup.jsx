import { useState } from "react";
import { BottomWarning } from "../component/BottomWarning";
import { Inputbox } from "../component/Inputbox";
import { SubHeading } from "../component/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupBtn = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        firstname,
        lastname,
        username,
        password,
      }
    );
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <h2>Sign up</h2>
          <SubHeading label={"Enter your infromation to create an account"} />
          <Inputbox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <Inputbox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
          <Inputbox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="john12@gmail.com"
            label={"Email "}
          />
          <Inputbox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />

          <div className="pt-4">
            <button onClick={signupBtn}>Sign up</button>
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
