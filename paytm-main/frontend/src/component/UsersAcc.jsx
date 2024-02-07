import React from "react";
import { useNavigate } from "react-router-dom";

function UsersAcc({ user }) {
  const navigate = useNavigate();
  return (
    <div className=" w-full flex justify-between items-center ">
      <div className="px-4 flex justify-center items-center">
        <img src="" alt="temparay one" className="h-5 w-5 rounded-full" />
        <h3 className="p-4">{user.firstname}</h3>
      </div>

      <button
        onClick={() => {
          navigate("/send?id" + user._id + "&name=" + user.username);
        }}
        className="mx-4 bg-black px-3 py-2 font-bold rounded text-white"
      >
        Send Money
      </button>
    </div>
  );
}

export default UsersAcc;
