// // Workspace.js code

import React from "react";
import { useDrop } from "react-dnd";

const Workspace = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BLOCK",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-full h-64 p-4 bg-gray-200 rounded-lg ${
        isOver ? "bg-green-100" : ""
      }`}
    >
      Drop blocks here
    </div>
  );
};

export default Workspace;
