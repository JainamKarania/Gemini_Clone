import React, { useState, useContext } from 'react';
import {
  MdAdd,
  MdChat,
  MdMenu,
} from 'react-icons/md';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`min-h-screen bg-[#f0f4f9] transition-all duration-300 ease-in-out
        ${isOpen ? 'w-72 px-4' : 'w-16 px-2'} pt-6 flex flex-col`}
      >
        {/* Top: Menu Toggle Always Visible */}
        <div className="flex items-center justify-start gap-2 mb-4">
          <MdMenu
            className="w-6 h-6 cursor-pointer text-gray-700"
            onClick={toggleSidebar}
          />
          {isOpen && <p className="text-xl font-semibold">GForce</p>}
        </div>

        {/* Show rest of sidebar only when open */}
        {isOpen && (
          <div className="flex flex-col justify-between flex-1">
            {/* Top Section */}
            <div className="flex flex-col gap-4">
              {/* New Chat Button */}
              <div
                className="inline-flex items-center gap-3 cursor-pointer rounded-xl bg-[#e6eaf5] p-3
                  hover:bg-[#dbe2f0] transition-all duration-300 ease-in-out hover:shadow-md"
                onClick={newChat}
              >
                <MdAdd className="w-5 h-5 text-gray-700" />
                <p className="text-lg text-gray-800">New Chat</p>
              </div>

              {/* Recent */}
              <p className="border-b bg-transparent pb-2">Recent</p>
              {prevPrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-3 cursor-pointer rounded-xl hover:bg-[#e6eaf5] p-3
                    transition-all duration-300 ease-in-out hover:shadow-md"
                  onClick={() => loadPrompt(prompt)}
                >
                  <MdChat className="w-5 h-5 text-gray-700" />
                  <p className="text-lg text-gray-800">
                    {prompt?.length > 18 ? `${prompt.slice(0, 18)}…` : prompt}
                  </p>
                </div>
              ))}
            </div>

            {/* Optional: Bottom Section */}
            {/* Add if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
