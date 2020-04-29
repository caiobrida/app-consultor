import React from "react";

// import { Container } from './styles';

export default function Header({ user }) {
  return (
    <header>
      Hello,<strong>{user}</strong>
    </header>
  );
}
