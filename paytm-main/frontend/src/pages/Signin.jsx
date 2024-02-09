import { useState } from "react";
import { BottomWarning } from "../component/BottomWarning";
import { Inputbox } from "../component/Inputbox";
import { SubHeading } from "../component/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const signinBtn = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
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
          <h3>Sign in</h3>
          <SubHeading label={"Enter your credentials to access your account"} />
          <Inputbox
            placeholder="harkirat@gmail.com"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
          />
          <Inputbox
            placeholder="123456"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
          />
          <div className="pt-4">
            <button onClick={signinBtn}>Sign in</button>
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
