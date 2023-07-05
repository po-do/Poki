import React from "react";
import myBackground from "../../icons/firework.gif";

export default function FireWork() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${myBackground})`,
          backgroundSize: "contain",
          height: "100vh",
        }}
      >
        {/* Your content */}
        <div className="text-white text-3xl text-center pt-96">축하합니다</div>
      </div>
    </>
  );
}
