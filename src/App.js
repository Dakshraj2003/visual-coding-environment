// import logo from './logo.svg';
import "./App.css";

import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Block from "./components/Block";
import Workspace from "./components/Workspace";
import Sprite from "./components/Sprite";

const App = () => {
  const [history, setHistory] = useState([]);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [spriteRotation, setSpriteRotation] = useState(0);
  const [spriteSize, setSpriteSize] = useState(150);
  const [isSpriteVisible, setIsSpriteVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const initialSpriteState = {
    position: { x: 0, y: 0 },
    rotation: 0,
    size: 150,
    visible: true,
  };

  const handleDrop = useCallback((item) => {
    setHistory((prevHistory) => [...prevHistory, item]);
  }, []);

  const removeAction = (index) => {
    setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
    resetSpriteToInitialState();
  };

  const resetSpriteToInitialState = () => {
    setSpritePosition(initialSpriteState.position);
    setSpriteRotation(initialSpriteState.rotation);
    setSpriteSize(initialSpriteState.size);
    setIsSpriteVisible(initialSpriteState.visible);
  };

  const runActions = async () => {
    for (const action of history) {
      await new Promise((resolve) => {
        setTimeout(() => {
          executeAction(action);
          if (action.action === "showMessage") {
            triggerMessageDisplay();
          }
          resolve();
        }, 500);
      });
    }
  };

  const triggerMessageDisplay = () => {
    if (history.some((item) => item.action === "showMessage")) {
      const messages = ["Hi", "Hello", "Greetings", "Welcome"];
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMessage);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 4000);
    }
  };

  const replayAction = (index) => {
    const actionToReplay = history[index];
    executeAction(actionToReplay);
    if (actionToReplay.action === "showMessage") {
      triggerMessageDisplay();
    }
  };

  const executeAction = (action) => {
    switch (action.action) {
      case "move":
        setSpritePosition((prevPosition) => ({
          x: prevPosition.x + 10 * Math.cos((spriteRotation * Math.PI) / 180),
          y: prevPosition.y + 10 * Math.sin((spriteRotation * Math.PI) / 180),
        }));
        break;
      case "turnClockwise":
        setSpriteRotation((prevRotation) => prevRotation + 15);
        break;
      case "turnAnticlockwise":
        setSpriteRotation((prevRotation) => prevRotation - 15);
        break;
      case "changeSize":
        setSpriteSize((prevSize) => prevSize + 10);
        break;
      case "hideSprite":
        setIsSpriteVisible(false);
        break;
      case "showSprite":
        setIsSpriteVisible(true);
        break;
      default:
        break;
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="flex h-screen p-4 bg-gray-100">
        {/* Blocks Card */}
        <div className="w-1/4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Motion</h2>
          <Block type="Motion" action="move" label="Move" />
          <Block type="Motion" action="turnClockwise" label="Turn Clockwise" />
          <Block
            type="Motion"
            action="turnAnticlockwise"
            label="Turn Anticlockwise"
          />
          <h2 className="text-lg font-bold mt-8 mb-4">Looks</h2>
          <Block type="Looks" action="hideSprite" label="Hide" />
          <Block type="Looks" action="showSprite" label="Show" />
          <Block type="Looks" action="changeSize" label="Change Size" />
          <Block
            className="bg-pink-200 p-2 rounded mb-2"
            type="Looks"
            action="showMessage"
            label="Show Message on Run"
          />
        </div>

        {/* Main Content */}
        <div className="w-2/4 p-6 flex flex-col items-center">
          {/* Sprite Box */}
          <div className="w-full h-80 mb-4 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center">
            <Sprite
              position={spritePosition}
              rotation={spriteRotation}
              size={spriteSize}
              visible={isSpriteVisible}
              showMessage={showMessage}
              message={message} // Pass the message to the sprite component
            />
          </div>

          {/* Workspace */}
          <div className="w-full h-80 p-4 bg-gray-200 rounded-lg border-4 border-gray-300">
            <Workspace onDrop={handleDrop} />
          </div>

          <button
            onClick={runActions}
            className="mt-4 bg-green-500 text-white p-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 duration-200"
          >
            Run
          </button>
        </div>

        {/* History Card */}
        <div className="w-1/4 p-4 bg-white rounded-lg shadow-lg">
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
                <button
                  onClick={() => replayAction(index)}
                  className="ml-2 bg-blue-500 text-white p-1 px-3 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Replay
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



