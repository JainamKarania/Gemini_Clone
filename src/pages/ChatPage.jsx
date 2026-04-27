import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Content from "../components/Main/Content";

const ChatPage = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <Content />
    </div>
  );
};

export default ChatPage;