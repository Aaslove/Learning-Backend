import React, { useEffect, useState } from "react";
import Heading from "../component/Heading";
import UsersAcc from "../component/UsersAcc";
import axios from "axios";

function Dashboard() {
  const [loader, setLoader] = useState(true);
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const fetchAmount = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWMwZTRlMzZjNDlhNTYyNzU1NmJhODQiLCJpYXQiOjE3MDcxNDAzMjN9.xvNgn1lo0m66uSjBUrGJVzIMi13GiQfo_ZIhAdTEZxg",
        },
      }
    );
    console.log(data);
    setBalance(data.balance);
  };
  const searchUsers = async (e) => {
    const value = e.target.value;
    const { data } = await axios.get("http://localhost:3000/api/v1/user/bulk", {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWMwZTRlMzZjNDlhNTYyNzU1NmJhODQiLCJpYXQiOjE3MDcxNDAzMjN9.xvNgn1lo0m66uSjBUrGJVzIMi13GiQfo_ZIhAdTEZxg",
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
      <h3 className="m-4">Your Balance: rs {balance}</h3>
      <div className="mx-4">
        <h3>Users</h3>
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
          return <UsersAcc key={user._id} user={user} />;
        })
      )}
    </div>
  );
}

export default Dashboard;
