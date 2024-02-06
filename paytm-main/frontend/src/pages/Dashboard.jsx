import React, { useState } from "react";
import Heading from "../component/Heading";
import UsersAcc from "../component/UsersAcc";

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const fetchData = async () => {
    const { balance } = await axios("http://localhost:3000/api/v1/balance");
    setBalance(balance);
  };

  return (
    <div className="w-full ">
      <Heading />
      <h3 className="m-4">Your Balance: {}</h3>
      <div className="mx-4">
        <h3>Users</h3>
        <input
          type="text"
          placeholder="search users..."
          className="p-2 w-full my-5 border border-gray-500 rounded"
        />
      </div>
      <UsersAcc />
    </div>
  );
}

export default Dashboard;
