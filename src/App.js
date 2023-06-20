import React from "react";
import Login from "./pages/General/Login";
import axios from "axios";
import io from "socket.io-client";

axios.defaults.withCredentials = true;
export const socket = io("http://localhost:4000");

function App() {
  return <Login />;
}

export default App;
