import React from "react";

export default function Button({ type, onClick, classes = [], label }) {
  return (
    <button type={type} onClick={onClick} className={classes.join(" ")}>
      {label}
    </button>
  );
}
