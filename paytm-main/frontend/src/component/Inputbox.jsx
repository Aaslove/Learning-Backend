import React from "react";

export function Inputbox({ label, placeholder, onChange }) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  );
}
