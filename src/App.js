
import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Block from "./components/Block";
import Workspace from "./components/Workspace";
import Sprite from "./components/Sprite";

import cat from "./assets/cat.png"; // Image for Sprite 1
import girl from "./assets/girl.png"; // Image for Sprite 2
import ball from "./assets/ball.png"; // Image for Sprite 3
import basket from "./assets/basket.png"; // Image for Sprite 4

const App = () => {
  const [history, setHistory] = useState([]);
  const [sprites, setSprites] = useState([
    { id: 1, name: "Cat", position: { x: 0, y: 0 }, rotation: 0, size: 150, visible: true, image: cat, initialPosition: { x: 0, y: 0 } },
    { id: 2, name: "Girl", position: { x: 0, y: 0 }, rotation: 0, size: 150, visible: true, image: girl, initialPosition: { x: 0, y: 0 } },
    { id: 3, name: "Ball", position: { x: 0, y: 0 }, rotation: 0, size: 150, visible: true, image: ball, initialPosition: { x: 0, y: 0 } },
    { id: 4, name: "Basket", position: { x: 0, y: 0 }, rotation: 0, size: 150, visible: true, image: basket, initialPosition: { x: 0, y: 0 } },
  ]);
  const [selectedSprites, setSelectedSprites] = useState([]); // Multiple selected sprites
  const [moveSteps, setMoveSteps] = useState(10);

  const handleDrop = useCallback((item) => {
    setHistory((prevHistory) => [...prevHistory, { ...item, steps: moveSteps }]);
  }, [moveSteps]);

  const removeAction = (index) => {
    setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
  };

  const resetSpriteToInitialState = (spriteId) => {
    setSprites((prevSprites) =>
      prevSprites.map((sprite) =>
        sprite.id === spriteId
          ? { ...sprite, position: sprite.initialPosition, rotation: 0, size: 150, visible: true }
          : sprite
      )
    );
  };

  const runActions = async () => {
    for (const action of history) {
      await new Promise((resolve) => {
        setTimeout(() => {
          executeAction(action);
          resolve();
        }, 500);
      });
    }
  };

  const executeAction = (action) => {
    setSprites((prevSprites) =>
      prevSprites.map((sprite) => {
        // Apply actions only to the selected sprites
        if (!selectedSprites.includes(sprite.id)) return sprite;

        switch (action.action) {
          case "move":
            const newPosition = {
              x: sprite.position.x + action.steps * Math.cos((sprite.rotation * Math.PI) / 180),
              y: sprite.position.y + action.steps * Math.sin((sprite.rotation * Math.PI) / 180),
            };

            // Boundary checks
            const containerWidth = 600;  // Adjust according to your design
            const containerHeight = 400; // Adjust according to your design

            // Ensure the sprite stays within bounds
            if (newPosition.x < 0) newPosition.x = 0;
            if (newPosition.y < 0) newPosition.y = 0;
            if (newPosition.x + sprite.size > containerWidth) newPosition.x = containerWidth - sprite.size;
            if (newPosition.y + sprite.size > containerHeight) newPosition.y = containerHeight - sprite.size;

            return { ...sprite, position: newPosition };
          case "turnClockwise":
            return { ...sprite, rotation: sprite.rotation + 15 };
          case "turnAnticlockwise":
            return { ...sprite, rotation: sprite.rotation - 15 };
          case "changeSize":
            return { ...sprite, size: sprite.size + 10 };
          case "hideSprite":
            return { ...sprite, visible: false };
          case "showSprite":
            return { ...sprite, visible: true };
          default:
            return sprite;
        }
      })
    );
  };

  const handleSpriteSelection = (spriteId) => {
    setSelectedSprites((prevSelected) => {
      if (prevSelected.includes(spriteId)) {
        // Deselect the sprite if it's already selected
        return prevSelected.filter((id) => id !== spriteId);
      } else {
        // Select the sprite
        return [...prevSelected, spriteId];
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen p-4 bg-gray-100">
        <div className="w-1/4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Motion</h2>
          <input
            type="number"
            placeholder="Move steps"
            value={moveSteps}
            onChange={(e) => setMoveSteps(parseInt(e.target.value))}
            className="mb-4 p-2 border rounded w-full"
          />
          <Block type="Motion" action="move" label="Move" />
          <Block type="Motion" action="turnClockwise" label="Turn Clockwise" />
          <Block type="Motion" action="turnAnticlockwise" label="Turn Anticlockwise" />
          <h2 className="text-lg font-bold mt-8 mb-4">Looks</h2>
          <Block type="Looks" action="hideSprite" label="Hide" />
          <Block type="Looks" action="showSprite" label="Show" />
          <Block type="Looks" action="changeSize" label="Change Size" />
        </div>

        <div className="w-2/4 p-6 flex flex-col items-center">
          <div className="w-full h-80 mb-4 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center relative">
            {sprites.map((sprite) => {
              // Display all selected sprites in the workspace
              if (selectedSprites.includes(sprite.id)) {
                return (
                  <Sprite
                    key={sprite.id}
                    position={sprite.position}
                    rotation={sprite.rotation}
                    size={sprite.size}
                    visible={sprite.visible}
                    selected={selectedSprites.includes(sprite.id)}
                    image={sprite.image}
                  />
                );
              }
              return null;
            })}
          </div>

          <Workspace onDrop={handleDrop} />

          <button
            onClick={runActions}
            className="mt-4 bg-green-500 text-white p-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 duration-200"
          >
            Run
          </button>
        </div>

        <div className="w-1/4 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4">Select Sprite</h3>
          {sprites.map((sprite) => (
            <div key={sprite.id} className="mb-4 flex items-center gap-4">
              <button
                onClick={() => handleSpriteSelection(sprite.id)}
                className={`flex-1 text-left p-2 rounded ${
                  selectedSprites.includes(sprite.id) ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {sprite.name}
              </button>
              <button
                onClick={() => resetSpriteToInitialState(sprite.id)}
                className="w-32 bg-yellow-500 text-white p-1 px-3 rounded hover:bg-yellow-600 transition-colors duration-200"
              >
                Reset {sprite.name}
              </button>
            </div>
          ))}

          <h3 className="text-lg font-bold mb-4">History</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index} className="flex items-center mb-2 text-sm">
                {item.label}
                <button
                  onClick={() => removeAction(index)}
                  className="ml-2 bg-red-500 text-white p-1 px-3 rounded hover:bg-red-700 transition-colors duration-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;


















