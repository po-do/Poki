import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import * as process from "process";

//General
import App from "./App";
import NotFound from "./pages/General/NotFound";
import Signup from "./pages/General/Signup";
import client from "./api/client.js";
import Video from "./pages/Video/Video";

// Parent Page
import ParentFormat from "./pages/parents/ParentFormat";
import ParentMain from "./pages/parents/ParentMain";
import Mission from "./pages/parents/Mission";
import ParentWishList from "./pages/parents/ParentWishList";

// Child Page
import ChildFormat from "./pages/children/ChildFormat";
import ChildMain from "./pages/children/ChildMain";
import ChildWishList from "./pages/children/ChildWishList";

// pwa
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// recoil
import { RecoilRoot, useRecoilValue } from "recoil";
import { userState } from "./recoil/user";

// chatting
import ParentChatFormat from "./pages/Chat/ParentChatFormat";
import ChildChatFormat from "./pages/Chat/ChildChatFormat";
import ParentCalendar from "./pages/parents/ParentCalendar";
import ChildMission from "./pages/children/ChildMission";

const ChatFormat = (props) => {
  const user = useRecoilValue(userState);
  return user.type === "PARENT" ? <ParentChatFormat /> : <ChildChatFormat />;
};

// client.defaults.baseURL = "http://3.34.134.62:3000";
// client.defaults.baseURL = "http://localhost:4000";
// client.defaults.baseURL = "https://api.pokids.site:8000";
client.defaults.baseURL = process.env.REACT_APP_API_URL;
client.defaults.withCredentials = true;
client.defaults.headers.common["Authorization"] = "";

window.global = window;
window.process = process;
window.Buffer = [];

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
    path: "/chat/:roomName",
    element: <ChatFormat />,
    errorElement: <NotFound />,
  },
  {
    path: "/test",
    element: <Video />,
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
      { path: "/format/parent/video", element: <Video /> },
      { path: "/format/parent/calendar", element: <ParentCalendar /> },
    ],
  },
  {
    path: "/format/child",
    element: <ChildFormat />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/format/child", element: <ChildMain /> },
      { path: "/format/child/mission", element: <ChildMission /> },
      { path: "/format/child/wishlist", element: <ChildWishList /> },
      { path: "/format/child/video", element: <Video /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

serviceWorkerRegistration.register();
