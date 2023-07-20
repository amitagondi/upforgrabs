import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx'
import { hydrateRoot } from 'react-dom/client';

export function IntroPage(props) {
  const [numPlayers, setNumPlayers] = useState(0);

  return (
    <div>
      <h1>Up for Grabs</h1>
      <div>
        <input
          type="number"
          placeholder="Enter the number of players"
          onChange={(e) => setNumPlayers(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => {
          if (numPlayers > 0) {
            const domNode = document.getElementById('root');
            const root = hydrateRoot(domNode, <App numPlayers={numPlayers} />);
            root.render(<App />);
          } else {
            alert("Please enter the number of players!");
          }
        }}>Start Game</button>
      </div>
    </div>
  );
};