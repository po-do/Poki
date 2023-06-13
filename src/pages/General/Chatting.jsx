import React from "react";

export default function Chatting() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl">
        <div className="bg-white rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-start">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://img.lukepeters.me/avatar.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <strong className="block">Luke Peters</strong>
                <span className="text-gray-700">Hello!</span>
              </div>
            </div>
            {/* Add other received message elements */}
            <div className="flex items-end justify-end">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="http://img.lukepeters.me/jack.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <strong className="block">Jack Sparrow</strong>
                <span className="text-gray-700">Oh hello. Who is this?</span>
              </div>
            </div>
            {/* ------------------- */}
            <div className="flex items-start justify-start">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://img.lukepeters.me/avatar.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <strong className="block">Luke Peters</strong>
                <span className="text-gray-700">Hello!</span>
              </div>
            </div>
            <div className="flex items-end justify-end">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="http://img.lukepeters.me/jack.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <strong className="block">Jack Sparrow</strong>
                <span className="text-gray-700">Oh hello. Who is this?</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-4 py-2 bg-purple-600 text-white rounded-r-md">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
