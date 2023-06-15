import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import NotFound from "./pages/General/NotFound";
import Signup from "./pages/General/Signup";
import client from "./api/client.ts";
// Parent Page
import ParentFormat from "./pages/parents/ParentFormat";
import ParentMain from "./pages/parents/ParentMain";
import Mission from "./pages/parents/Mission";
import ParentWishList from "./pages/parents/ParentWishList";
import Calender from "./pages/General/Calender";
import Chatting from "./pages/General/Chatting";
import ParentMyPage from "./pages/parents/ParentMyPage";
// Child Page
import ChildFormat from "./pages/children/ChildFormat";
import ChildWishList from "./pages/children/ChildWishList";
import ChildMain from "./pages/children/ChildMain";
import ChildMyPage from "./pages/children/ChildMyPage";

// recoil
import { RecoilRoot } from "recoil";

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
      { path: "/format/parent/mypage", element: <ParentMyPage /> },
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
      { path: "/format/child/mypage", element: <ChildMyPage /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
