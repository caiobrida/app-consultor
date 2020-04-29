import React from "react";

import Message from "./Message";

export default function MessagesList({ messages, handleClick }) {
  return (
    <>
      {messages.map((msg, i) => (
        <ul key={msg._id || i}>
          <Message
            user={msg.user}
            date={msg.createdAt || Date.now()}
            messageObject={msg}
            handleClick={handleClick}
          />
        </ul>
      ))}
    </>
  );
}
