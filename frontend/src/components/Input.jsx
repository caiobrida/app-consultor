import React from "react";

export default function Input({
  label,
  type,
  classes = [],
  value,
  placeholder,
  handleChange,
}) {
  return (
    <div className="inputGroup">
      <span>{label}</span>
      <input
        type={type || "text"}
        className={classes.join(" ")}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
