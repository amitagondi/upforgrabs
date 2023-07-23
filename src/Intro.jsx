import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { hydrateRoot } from 'react-dom/client';
import { Modal } from 'react-bootstrap';

export function IntroPage(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [numPlayers, setNumPlayers] = useState(2);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  return (
    <div>
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <div
          style={{ backgroundColor: '#ffece8', padding: 35, color: '#ce6768' }}
        >
          <h1 style={{ fontFamily: 'Roboto', fontSize: '3em' }}>
            Welcome to Up for Grabs!
          </h1>
          <br />
          <div>
            <p>
              This is a fun and challenging word game for two players. The goal
              of the game is to make as many words as possible before the tiles
              run out.
            </p>
            <p>
              To play, each player takes turns flipping over tiles to reveal
              letters. The player can then use those letters to spell out a
              word. If the players word is in the dictionary, they get a point
              and the tiles are off the board. Caveats at the moment:
              <ul>
                <li>
                  When stealing a word, can't add more than three letters.
                </li>
                <li>Have to play on same laptop</li>
                <li>More than two players can't play</li>
                <li>
                  Some logic rules regarding root words may be missing / wrong.
                </li>
              </ul>
            </p>
            <p>Are you ready to play?</p>
          </div>
          <div style={{ margin: '10px', borderRadius: '5px' }}>
            <input 
              type="text" value={player1Name}
              placeholder='Enter Player 1 name'
              onChange={e => setPlayer1Name(e.target.value)}
            />
          </div>
          <br />
          <div style={{ margin: '10px', borderRadius: '5px' }}>
            <input
              type='text' value={player2Name}
              placeholder='Enter Player 2 name'
              onChange={e => setPlayer2Name(e.target.value)}
            />
          </div>
          <div style={{ margin: '10px', padding: '10px' }}>
            <button
              style={{ border: '1px solid green' }}
              onClick={() => {
                if (numPlayers > 0) {
                  setIsOpen(false);
                  const domNode = document.getElementById('root');
                  const root = hydrateRoot(
                    domNode,
                    <App numPlayers={2} />
                  );
                  root.render(
                    <App
                      numPlayers={2}
                      player1Name={player1Name}
                      player2Name={player2Name}
                    />
                  );
                } else {
                  alert('Please enter the number of players!');
                }
              }}
            >
              Start Game
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
// import React, { useState } from "react";
// import ReactDOM from 'react-dom/client';
// import { App } from './App.jsx'
// import { hydrateRoot } from 'react-dom/client';
// import { Modal } from 'react-bootstrap';

// export function IntroPage(props) {
//   const [isOpen, setIsOpen] = useState(true);
//   const [numPlayers, setNumPlayers] = useState(2);

//   return (
//     <div>
//       <Modal show={isOpen} onHide={() => setIsOpen(false)}>
//           <div style={{ backgroundColor: "lightblue", padding: 35}}>
//       <h1 style={{ fontFamily: "Roboto", fontSize: "3em" }}>Welcome to Up for Grabs!</h1>
//       <br />
//       <div>
//         <p>
//           This is a fun and challenging word game for two players. The goal of the game is to make as many words as possible before the tiles run out.
//         </p>
//         <p>
//           To play, each player takes turns flipping over tiles to reveal letters. The player can then use those letters to spell out a word. If the players word is in the dictionary, they get a point and the tiles are off the board.  Add more
//         </p>
//         <p>
//           Are you ready to play?
//         </p>
//       </div>
//       <div style={{ margin: "10px", borderRadius: "5px" }}>
//         <input
//           type="number"
//           placeholder="Enter the number of players"
//           onChange={(e) => setNumPlayers(e.target.value)}
//         />
//       </div>
//       <div style={{ margin: "10px", padding: "10px" }}>
// <button style={{ border: "1px solid green" }} onClick={() => {
//   if (numPlayers > 0) {
// const domNode = document.getElementById('root');
// const root = hydrateRoot(domNode, <App numPlayers={numPlayers} />);
// root.render(<App />);

//   } else {
//     alert("Please enter the number of players!");
//   }
// }}>Start Game</button>
//       </div>
//     </div>

//       </Modal>
//     </div>
//   );
// };

// export function IntroPage(props) {
//   const [numPlayers, setNumPlayers] = useState(0);

//   return (
//     <div style={{ backgroundColor: "lightblue" }}>
//       <h1 style={{ fontFamily: "Roboto", fontSize: "3em" }}>Welcome to Up for Grabs!</h1>
//       <br />
//       <div style={{ margin: "10px", borderRadius: "5px" }}>
//         <input
//           type="number"
//           placeholder="Enter the number of players"
//           onChange={(e) => setNumPlayers(e.target.value)}
//         />
//       </div>
//       <div style={{ margin: "10px", padding: "10px" }}>
//         <button style={{ border: "1px solid green" }} onClick={() => {
//           if (numPlayers > 0) {
//             const domNode = document.getElementById('root');
//             const root = hydrateRoot(domNode, <App numPlayers={numPlayers} />);
//             root.render(<App />);
//           } else {
//             alert("Please enter the number of players!");
//           }
//         }}>Start Game</button>
//       </div>
//     </div>
//   );
// };

// //     <div style={{ backgroundColor: "lightblue" }}>
// //       <h1 style={{ fontFamily: "Roboto", fontSize: "3em" }}>Welcome to Up for Grabs!</h1>
// //       </div>
// //       <div style={{ margin: "10px", borderRadius: "5px" }}>
// //         <input
// //           type="number"
// //           placeholder="Enter the number of players"
// //           onChange={(e) => setNumPlayers(e.target.value)}
// //         />
// //       </div>
// //       <div style={{ margin: "10px", padding: "10px" }}>
// //         <button style={{ border: "1px solid green" }} onClick={() => {
// //           if (numPlayers > 0) {
// //             const domNode = document.getElementById('root');
// //             const root = hydrateRoot(domNode, <App numPlayers={numPlayers} />);
// //             root.render(<App />);
// //           } else {
// //             alert("Please enter the number of players!");
// //           }
// //         }}>Start Game</button>
// //       </div>
// //     </div>
// //     <div class="popup">
// //       <div class="close">
// //         <button onClick={() => {
// //           document.querySelector(".popup").style.display = "none";
// //         }}>
// //           Close
// //         </button>
// //       </div>
// //       <div class="content">
// <h2 style={{ fontFamily: "Roboto", fontSize: "2em" }}>Up for Grabs!</h2>
// <p>
//   This is a fun and challenging word game for two players. The goal of the game is to be the first player to spell five words correctly.
// </p>
// <p>
//   To play, each player takes turns flipping over tiles to reveal letters. The player can then use those letters to spell words. If a player spells a word correctly, they get a point. The first player to reach five points wins the game.
// </p>
// <p>
//   Are you ready to play?
// </p>
// //         <button onClick={() => {
// //           document.querySelector(".popup").style.display = "none";
// //         }}>
// //           Start Game
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useState } from "react";
// import ReactDOM from 'react-dom/client';
// import { App } from './App.jsx'
// import { hydrateRoot } from 'react-dom/client';

// export function IntroPage(props) {
//   const [numPlayers, setNumPlayers] = useState(0);

//   return (
//     <div style={{ backgroundColor: "lightblue" }}>
//       <h1 style={{ fontFamily: "Roboto", fontSize: "3em" }}>Welcome to Up for Grabs!</h1>
//       <br />
//       <div style={{ margin: "10px", borderRadius: "5px" }}>
//         <input
//           type="number"
//           placeholder="Enter the number of players"
//           onChange={(e) => setNumPlayers(e.target.value)}
//         />
//       </div>
//       <div style={{ margin: "10px", padding: "10px" }}>
//         <button style={{ border: "1px solid green" }} onClick={() => {
//           if (numPlayers > 0) {
//             const domNode = document.getElementById('root');
//             const root = hydrateRoot(domNode, <App numPlayers={numPlayers} />);
//             root.render(<App />);
//           } else {
//             alert("Please enter the number of players!");
//           }
//         }}>Start Game</button>
//       </div>
//     </div>
// <div class="popup">
//   <div class="close">
//     <button onClick={() => {
//       document.querySelector(".popup").style.display = "none";
//     }}>
//       Close
//     </button>
//   </div>
//   <div class="content">
//     <h2 style={{ fontFamily: "Roboto", fontSize: "2em" }}>Up for Grabs!</h2>
//     <p>
//       This is a fun and challenging word game for two players. The goal of the game is to be the first player to spell five words correctly.
//     </p>
//     <p>
//       To play, each player takes turns flipping over tiles to reveal letters. The player can then use those letters to spell words. If a player spells a word correctly, they get a point. The first player to reach five points wins the game.
//     </p>
//     <p>
//       Are you ready to play?
//     </p>
//     <button onClick={() => {
//       document.querySelector(".popup").style.display = "none";
//     }}>Start Game
//     </button>
//   </div>
// </div>
//   );
// };

// export default IntroPage;
