import React from "react";

function PopupMessage({ visible, message }) {
  if (visible) {
    console.log(message);
    return (
      <div className="w-[200px] rounded-md shadow-md overflow-hidden p-2">
        <div className="flex flex-col justify-center">
          {message}
          <div className="flex justify-center text-center text-lg bg-orange-400 rounded-xl text-white">
            <button>ok</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupMessage;
