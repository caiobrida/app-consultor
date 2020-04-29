import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Form from "../../components/Form";

import "./styles.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3333/auth", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  const inputs = [
    {
      id: 1,
      value: username,
      label: "Username",
      handleChange: setUsername,
    },
    {
      id: 2,
      value: password,
      label: "Password",
      type: "password",
      handleChange: setPassword,
    },
  ];

  const buttons = [
    {
      id: 1,
      label: "Login",
    },
  ];

  return (
    <div id="loginForm">
      <Form
        title="LOGIN"
        handleSubmit={handleSubmit}
        inputs={inputs}
        buttons={buttons}
        error={error}
      />
    </div>
  );
}
