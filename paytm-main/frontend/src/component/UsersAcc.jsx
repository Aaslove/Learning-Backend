import React from "react";
import { useNavigate } from "react-router-dom";

function UsersAcc({ user }) {
  const navigate = useNavigate();
  return (
    <div className=" w-full flex justify-between items-center bg-gray-200 rounded-lg  ">
      <div className="px-4 flex justify-center items-center">
        <h2 className="h-12 w-12 flex justify-center items-center text-3xl capitalize  text-white font-bold text-center rounded-full bg-blue-400">
          {user.firstname[0]}
        </h2>
        <h3 className="p-4 capitalize text-2xl font-bold">
          {user.firstname} {user.lastname}
        </h3>
      </div>

      <button
        onClick={() => {
          navigate("/send?id=" + user._id + "&name=" + user.username);
        }}
        className="mx-4 bg-black px-3 py-2 font-bold rounded text-white"
      >
        Send Money
      </button>
    </div>
  );
}

export default UsersAcc;
