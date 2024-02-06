import React from "react";
import { Link } from "react-router-dom";

function Card({ data }) {
  const { heading, subheading, button, txtButton, text, inputs } = data;
  return (
    <>
      <div className="w-[200px] bg-white rounded shadow-lg">
        <h2>{heading}</h2>
        <h3>{subheading}</h3>
        {inputs.map((inp) => {
          return (
            <div>
              <label>{inp}</label>
              <input
                type={inp === "Password" ? "password" : "text"}
                placeholder={inp}
              />
            </div>
          );
        })}
        {/* <button onClick={submitting}>{button}</button> */}
        <p>
          {text}
          <span>
            <Link to={`/${txtButton.toLowerCase()}`}>{txtButton}</Link>
          </span>
        </p>
      </div>
    </>
  );
}

export default Card;
