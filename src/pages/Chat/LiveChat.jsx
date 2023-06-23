import React, { useState } from 'react';
import grapeLogo from "../../icons/mstile-310x310.png";

export default function LiveChat() {
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);

  const toggleChatRoom = () => {
    setIsChatRoomOpen(!isChatRoomOpen);
  };
  
  return (
    <div>

      <button onClick={toggleChatRoom}>
        <img src={grapeLogo}  className="mx-auto h-20 w-auto rounded-full border " />
      </button>

      {isChatRoomOpen && (
        <div className="sidebar">
          hello
          <h2>Chat Room</h2>
          goodbye
        </div>
      )}
      
    </div>
  );
}

