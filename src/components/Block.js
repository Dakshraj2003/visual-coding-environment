// // Block.js  code

// import React from "react";
// import { useDrag } from "react-dnd";

// const Block = ({ type, action, label }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "BLOCK",
//     item: { type, action, label },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={drag}
//       className={`p-4 mb-2 bg-blue-500 text-white rounded-lg ${
//         isDragging ? "opacity-50" : "opacity-100"
//       }`}
//     >
//       {label}
//     </div>
//   );
// };

// export default Block;


import React from "react";
import { useDrag } from "react-dnd";

const Block = ({ type, action, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BLOCK",
    item: { type, action, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 mb-2 bg-blue-500 text-white rounded-lg ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {label}
    </div>
  );
};

export default Block;
