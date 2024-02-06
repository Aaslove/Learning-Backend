import React from "react";

function Heading() {
  return (
    <div className=" w-full flex justify-between items-center  border-b border-gray-500">
      <h1 className="px-4">Payment App</h1>
      <div className="px-4 flex justify-center items-center">
        <h3 className="p-4">hello, {}</h3>
        <img src="" alt="temparay one" className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
}

export default Heading;
