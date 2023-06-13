import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import NotFound from "./pages/General/NotFound";
import Signup from "./pages/General/Signup";
import axios from "axios";
import client from "./api/client.ts";
// Parent Page
import ParentFormat from "./pages/Parent/ParentFormat";
import ParentMain from "./pages/Parent/ParentMain";
import Mission from "./pages/Parent/Mission";
import ParentWishList from "./pages/Parent/ParentWishList";
import Calender from "./pages/General/Calender";
import Chatting from "./pages/General/Chatting";
// Child Page
import ChildFormat from "./pages/Child/ChildFormat";
import ChildWishList from "./pages/Child/ChildWishList";
import ChildMain from "./pages/Child/ChildMain";

client.defaults.baseURL = "http://3.38.168.129:3000";
client.defaults.withCredentials = true;
client.defaults.headers.common["Authorization"] = "";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <NotFound />,
  },
  {
    path: "/format/parent",
    element: <ParentFormat />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/format/parent", element: <ParentMain /> },
      { path: "/format/parent/mission", element: <Mission /> },
      { path: "/format/parent/wishlist", element: <ParentWishList /> },
      { path: "/format/parent/calender", element: <Calender /> },
      { path: "/format/parent/message", element: <Chatting /> },
    ],
  },
  {
    path: "/format/child",
    element: <ChildFormat />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/format/child", element: <ChildMain /> },
      { path: "/format/child/wishlist", element: <ChildWishList /> },
      { path: "/format/child/message", element: <Chatting /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
