import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import _ from "lodash";

import Header from "../../components/Header";
import Input from "../../components/Input";
import MessagesList from "../../components/MessagesList";

import "./styles.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "createdAt",
    order: "asc",
  });
  const [inputText, setInputText] = useState("");
  const [inputUser, setInputUser] = useState("");

  const history = useHistory();

  useEffect(() => {
    setUser(
      localStorage.getItem("token") && jwtDecode(localStorage.getItem("token"))
    );
  }, []);

  useEffect(() => {
    async function loadMessages() {
      const response = await axios.get("http://localhost:3333/messages");
      setMessages(response.data);
    }
    if (!localStorage.getItem("token")) history.push("/login");
    else loadMessages();
  }, []);

  async function handleDelete(_id) {
    await axios.delete(`http://localhost:3333/messages/${_id}`);
    const newMessages = messages.filter((message) => message._id !== _id);
    setMessages(newMessages);
  }

  function handleSort(path) {
    const newSortColumn = {
      path,
    };
    if (sortColumn.path === path)
      newSortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    setSortColumn(newSortColumn);
  }

  function filterMessages() {
    let filtered = messages;
    if (inputText)
      filtered = filtered.filter((m) =>
        m.message.toLowerCase().startsWith(inputText.toLowerCase())
      );

    if (inputUser)
      filtered = filtered.filter((m) =>
        m.user.toLowerCase().startsWith(inputUser.toLowerCase())
      );

    return _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  }

  return (
    <div id="dashboard">
      <Header user={user && user.username} />
      <main>
        <div id="filters">
          <span>Filters: </span>
          <span className="dateSpan" onClick={() => handleSort("createdAt")}>
            Date{" "}
            <span className="sortIcon">
              {sortColumn.order === "asc" ? "+" : "-"}
            </span>
          </span>
          <Input label="Text" value={inputText} handleChange={setInputText} />
          <Input label="User" value={inputUser} handleChange={setInputUser} />
        </div>
        <section>
          <MessagesList
            messages={filterMessages()}
            handleClick={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}
