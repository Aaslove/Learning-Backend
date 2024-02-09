import React from "react";

export function Inputbox({ label, placeholder, onChange }) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
        type={label === "Password" ? "password" : "text"}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
