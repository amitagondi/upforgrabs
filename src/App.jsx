import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export function App(props) {
  const [board, setBoard] = useState([]);
  const [words, setWords] = useState([]);
  const [numPlayers, setNumPlayers] = useState(2);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scoreboard, setScoreboard] = useState([0, 0]);

  const composition = [
    { letter: 'A', count: 9 },
    { letter: 'B', count: 2 },
    { letter: 'C', count: 2 },
    { letter: 'D', count: 4 },
    { letter: 'E', count: 12 },
    { letter: 'F', count: 2 },
    { letter: 'G', count: 3 },
    { letter: 'H', count: 2 },
    { letter: 'I', count: 9 },
    { letter: 'J', count: 1 },
    { letter: 'K', count: 1 },
    { letter: 'L', count: 4 },
    { letter: 'M', count: 2 },
    { letter: 'N', count: 6 },
    { letter: 'O', count: 8 },
    { letter: 'P', count: 2 },
    { letter: 'Q', count: 1 },
    { letter: 'R', count: 6 },
    { letter: 'S', count: 4 },
    { letter: 'T', count: 6 },
    { letter: 'U', count: 4 },
    { letter: 'V', count: 2 },
    { letter: 'W', count: 2 },
    { letter: 'X', count: 1 },
    { letter: 'Y', count: 2 },
    { letter: 'Z', count: 1 },
  ];

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt'
      );
      const words = await response.text();
      setWords(words.split('\n').map(word => word.toLowerCase()));
    };
    fetchWords();
  }, []);

  const handleFlipTile = () => {
    let randomIndex = Math.floor(Math.random() * composition.length);
    let letter = composition[randomIndex].letter;
    board.push(letter);
    composition.splice(composition.indexOf(letter), 1);
    handleNextPlayer();
  };

  const handleEnterWord = word => {
    if (word.length >= 4) {
      const isValidWord = words.includes(word);
      console.log(word);
      console.log(isValidWord);
      if (isValidWord) {
        const newScoreboard = [...scoreboard];
        newScoreboard[currentPlayer] += 1;
        setScoreboard(newScoreboard);
        for (let i = 0; i < word.length; i++) {
          board.splice(board.indexOf(word[i]) - 1, 1);
        }
        const div = document.createElement('div');
        div.textContent = `Player ${currentPlayer + 1}: ${word}`;
        document.getElementById('validWords').appendChild(div);
        document.querySelector('input').value = '';
      } else {
        alert('Invalid word!');
      }
    }
  };

  const handleNextPlayer = () => {
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
  };

  const handleFlipTileButton = player => {
    const disabled = currentPlayer !== player;
    return (
      <button key={player} disabled={disabled} onClick={() => handleFlipTile()}>
        Flip Tile
      </button>
    );
  };

  return (
    <div>
      <h1>Up for Grabs</h1>
      <div>
        <table>
          <thead>
            <tr>
              {Array(50).fill("").map((_, i) => (
                <th
                  key={i}
                  style={{
                    border: "1px solid black",
                  }}
                >{board[i]}</th>
              ))}
            </tr>
          </thead>
          <tbody />
        </table>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tr>
            <td>
              <h3>Player 1</h3>
              {handleFlipTileButton(0)}
              <br />
              {`${scoreboard[0]}`}
            </td>
            <td>
              <input
                type='text'
                placeholder='Enter a word'
                onChange={e => handleEnterWord(e.target.value)}
              />
            </td>
            <td>
              <h3>Player 2</h3>
              {handleFlipTileButton(1)}
              <br />
              {`${scoreboard[1]}`}
            </td>
          </tr>
          <tbody />
        </table>
      </div>
      <div></div>
      <div></div>
      <div id='validWords'></div>
    </div>
  );
}
