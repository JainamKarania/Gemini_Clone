import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdAdd,
  MdChatBubbleOutline,
  MdMenu,
  MdAutoAwesome,
  MdDeleteOutline,
} from "react-icons/md";

import { Context } from "../../context/Context";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
  } = useContext(Context);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <motion.div
      animate={{ width: isOpen ? 280 : 78 }}
      transition={{ duration: 0.25 }}
      className="h-screen sticky top-0 border-r border-slate-200 bg-white/80 backdrop-blur-xl flex flex-col shadow-sm"
    >
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 transition flex items-center justify-center"
          >
            <MdMenu className="text-2xl text-slate-700" />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.h2
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-500 to-violet-600 text-transparent bg-clip-text"
              >
                GForce
              </motion.h2>
            )}
          </AnimatePresence>
        </div>

        {/* New Chat */}
        <button
          onClick={newChat}
          className={`mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-md hover:scale-[1.02] transition px-4 py-3 flex items-center ${
            isOpen ? "justify-start gap-3" : "justify-center"
          }`}
        >
          <MdAdd className="text-xl" />
          {isOpen && <span className="font-medium">New Chat</span>}
        </button>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {isOpen && (
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase px-2 mb-3">
            Recent Chats
          </p>
        )}

        <div className="space-y-2">
          {prevPrompts?.map((prompt, index) => (
            <motion.button
              key={index}
              whileHover={{ x: 4 }}
              onClick={() => loadPrompt(prompt)}
              className={`w-full rounded-2xl px-3 py-3 text-left hover:bg-slate-100 transition flex items-center ${
                isOpen ? "gap-3" : "justify-center"
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <MdChatBubbleOutline className="text-lg text-slate-600" />
              </div>

              {isOpen && (
                <span className="text-sm text-slate-700 truncate">
                  {prompt?.length > 24
                    ? `${prompt.slice(0, 24)}...`
                    : prompt}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-3 border-t border-slate-100">
        <div
          className={`rounded-2xl bg-slate-50 border border-slate-200 p-3 flex items-center ${
            isOpen ? "gap-3" : "justify-center"
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center">
            <MdAutoAwesome className="text-lg" />
          </div>

          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-700">
                AI Assistant
              </p>
              <p className="text-xs text-slate-500">
                Powered by GForce
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;