import React, { useEffect, useState } from "react";
import Heading from "../component/Heading";
import UsersAcc from "../component/UsersAcc";
import axios from "axios";

export function Dashboard() {
  const [loader, setLoader] = useState(true);
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const fetchAmount = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    console.log(data);
    setBalance(Math.trunc(data.balance));
  };
  const searchUsers = async (e) => {
    const token = localStorage.getItem("token");
    const value = e.target.value;
    const { data } = await axios.get("http://localhost:3000/api/v1/user/bulk", {
      headers: {
        authorization: "Bearer " + token,
      },
      params: {
        filter: value,
      },
    });
    setUsers(data.user);
    console.log(users);
    setLoader(false);
  };
  useEffect(() => {
    searchUsers({ target: { value: "" } });
    fetchAmount();
  }, []);

  return (
    <div className="w-full ">
      <Heading />
      <div className="flex mx-4 my-2">
        <div className="font-bold text-lg">Your balance</div>
        <div className="font-semibold ml-4 text-lg">Rs {balance}</div>
      </div>
      <div className="mx-4">
        <div className="font-bold mt-6 text-lg">Users</div>
        <input
          type="text"
          onChange={searchUsers}
          placeholder="search users..."
          className="p-2 w-full my-5 border border-gray-500 rounded"
        />
      </div>
      {loader ? (
        <h1>Loading...</h1>
      ) : (
        users.map((user) => {
          console.log(user);
          return (
            <div className="m-4">
              <UsersAcc key={user._id} user={user} />;
            </div>
          );
        })
      )}
    </div>
  );
}

export default Dashboard;
