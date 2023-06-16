import React from "react";
import Login from "./pages/General/Login";
import axios from "axios";
                                                                           
axios.defaults.withCredentials = true;

function App() {
  return <Login />;
}

export default App;
