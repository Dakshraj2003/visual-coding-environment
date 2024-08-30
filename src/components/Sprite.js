import React from "react";
// import catImage from '../assets/cat.png'; // Import the image
import Picture1 from "../assets/Picture1.png";

const Sprite = ({
  position,
  rotation,
  size,
  visible,
  showMessage,
  message,
}) => {
  return (
    <div className="relative w-full h-72 bg-white border-2 border-dashed border-gray-400 rounded-lg">
      <img
        src={Picture1}
        alt="CatImage"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
          width: `${size}px`,
          height: `${size}px`,
          transition: "transform 0.2s ease, opacity 0.2s ease",
          position: "absolute",
          top: "20%",
          left: "10%",
          transformOrigin: "center center",
          opacity: visible ? 1 : 0,
        }}
      />
      {showMessage && message && (
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "calc(50% + 60px)", // Position the message to the right of the image
            transform: "translateY(-50%)",
            color: "green", // Green text color
            fontSize: "16px",
            whiteSpace: "nowrap",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Sprite;
