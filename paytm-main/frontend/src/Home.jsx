import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our Finance Management Web App
        </h1>
        <p className="text-lg mb-8">
          Track your finances, manage expenses, and send money securely.
        </p>
        <div className="flex justify-center">
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </Link>
        </div>
        <p className="mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Sign in here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default Home;
