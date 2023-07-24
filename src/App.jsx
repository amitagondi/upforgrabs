import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export function App(props) {
  const [board, setBoard] = useState(Array(49).fill(null));
  const [words, setWords] = useState([]);
  const [player1words, setPlayer1Words] = useState([]);
  const [player2words, setPlayer2Words] = useState([]);
  const [numPlayers, setNumPlayers] = useState(props.numPlayers);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scoreboard, setScoreboard] = useState([0, 0]);
  const [player1Name] = useState(props.player1Name);
  const [player2Name] = useState(props.player2Name);
  const [player1Done, setPlayer1Done] = useState(false);
  const [player2Done, setPlayer2Done] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const composition = useRef([
    'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'i', 'i', 'b', 'b', 'c', 'c', 'd', 'd', 'd', 'e', 'e', 'e', 'e', 'e', 'f', 'f', 'g', 'g', 'h', 'h', 'i', 'i', 'i', 'i', 'j', 'j', 'k', 'k', 'l', 'l', 'l', 'm', 'm', 'n', 'n', 'n', 'n', 'o', 'o', 'o', 'o', 'p', 'p', 'q', 'q', 'r', 'r', 'r', 'r', 's', 's', 's', 's', 't', 't', 't', 't', 'u', 'u', 'u', 'v', 'v', 'w', 'w', 'x', 'x', 'y', 'y', 'z', 'z',
  ]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words.txt');
        const words = await response.text();
        setWords(words.split('\n').map(word => word.toLowerCase()));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchWords();
  }, []);

  const handleTileClick = index => {
    let newBoard = [...board];
    if (board[index] === null) {
      let randomIndex = Math.floor(Math.random() * composition.current.length);
      let letter = composition.current[randomIndex];
      composition.current.splice(randomIndex, 1);
      newBoard[index] = letter;
      setBoard(newBoard);
    }

    if (composition.current.length === 0) {
      const totalScore = scoreboard[0] + scoreboard[1];
      if (totalScore > 0) {
        if (scoreboard[0] > scoreboard[1]) {
          console.log(`Player 1 is the winner with a score of ${scoreboard[0]}`);
        } else if (scoreboard[1] > scoreboard[0]) {
          console.log(`Player 2 is the winner with a score of ${scoreboard[1]}`);
        } else {
          console.log('The game is a draw!');
        }
      }
    }
    handleNextPlayer();
  };

  const generateCombinations = (arr, maxLength) => {
    const result = [];
    const backtrack = (currentCombination, start) => {
      if (currentCombination.length > maxLength) {
        return;
      }
      result.push([...currentCombination]);
      for (let i = start; i < arr.length; i++) {
        currentCombination.push(arr[i]);
        backtrack(currentCombination, i + 1);
        currentCombination.pop();
      }
    };
    backtrack([], 0);
    return result;
  };

  const stolenFromP1 = (player1words, updatedBoard, word) => {
    let stolen = false;
    let finWord = '';
    const filteredBoard = updatedBoard.filter(letter => letter !== null);
    for (let p1word of player1words) {
      for (let letter of generateCombinations(filteredBoard, 3)) {
        let l1 = [...p1word.split(''), ...letter].sort();
        let word1 = word.split('').sort();
        if (l1.every((letter, index) => word1[index] === letter)) {
          stolen = true;
          finWord = p1word;
          return [stolen, finWord];
        }
      }
    }
    return [stolen, finWord];
  };

  const stolenFromP2 = (player2words, updatedBoard, word) => {
    let stolen = false;
    let finWord = '';
    const filteredBoard = updatedBoard.filter(letter => letter !== null);
    for (let p2word of player2words) {
      for (let letter of generateCombinations(filteredBoard, 3)) {
        let l2 = [...p2word.split(''), ...letter].sort();
        let word2 = word.split('').sort();
        if (l2.every((letter, index) => word2[index] === letter)) {
          stolen = true;
          finWord = p2word;
          return [stolen, finWord];
        }
      }
    }
    return [stolen, finWord];
  };

  const isValidWordOnBoard = (word, board, stolenWord = '') => {
    let boardLetterCounts = {};
    let wordLetterCounts = {};

    for (let letter of [...board, ...stolenWord]) {
      if (letter) {
        boardLetterCounts[letter] = (boardLetterCounts[letter] || 0) + 1;
      }
    }

    for (let letter of word) {
      wordLetterCounts[letter] = (wordLetterCounts[letter] || 0) + 1;
    }

    for (let letter in wordLetterCounts) {
      if (!boardLetterCounts[letter] || wordLetterCounts[letter] > boardLetterCounts[letter]) {
        return false;
      }
    }

    return true;
  };

  const handleEnterWord = (e, playerNumber) => {
    let currentPlayer = playerNumber - 1;
    const word = e.target.value;
    const key = e.key;
    const isValidWord = words.includes(word);
    let stolenWord = '';
    let stolenWord1 = '';
    let stolenWord2 = '';
    if (word.length >= 4 && key === 'Enter') {
      if (!isValidWord) {
        alert('Invalid word!');
      }

      let [stolen1, stolenWord1] = stolenFromP1(player1words, board, word);
      let [stolen2, stolenWord2] = stolenFromP2(player2words, board, word);
      if (stolen1) stolenWord = stolenWord1;
      else if (stolen2) stolenWord = stolenWord2;
      if (((word.endsWith('s') && !stolenWord.endsWith('s')) || (word.endsWith('er') && !stolenWord.endsWith('er')) || (word.endsWith('ed') && !stolenWord.endsWith('ed'))) && stolenWord.length > 0) {
        alert('You cannot steal a word by simply adding -s, -er, or -ed to the end! Create a new root word');
        return;
      }
      if ((isValidWord && isValidWordOnBoard(word.toLowerCase(), board, stolenWord)) || stolenWord.length > 0) {
        if (stolen1) {
          if (word.length <= stolenWord.length && stolenWord.length > 0) {
            console.log(stolenWord);
            console.log(word);
            alert('New word must be longer than the stolen word!');
            return;
          }
          let newBoard = [...board];
          const div = document.createElement('div');
          div.textContent = `Player ${1}: ${stolenWord}`;
          document.getElementById('validWords1').removeChild(document.getElementById(stolenWord));
          player1words.splice(player1words.indexOf(word), 1);
          word.split('').filter(extraLetters => !stolenWord.includes(extraLetters)).forEach(letter => {
            const idx = newBoard.findIndex(tile => tile && tile.toLowerCase() === letter.toLowerCase());
            if (idx !== -1) {
              newBoard[idx] = null;
            }
          });
          setBoard(newBoard);
          scoreboard[0] = Math.max(0, scoreboard[0] - 1);
        } else if (stolen2) {
          if (word.length <= stolenWord.length && stolenWord.length > 0) {
            console.log(stolenWord);
            console.log(word);
            alert('New word must be longer than the stolen word!');
            return;
          }
          let newBoard = [...board];
          const div = document.createElement('div');
          div.textContent = `Player ${2}: ${stolenWord}`;
          document.getElementById('validWords2').removeChild(document.getElementById(stolenWord));
          player2words.splice(player2words.indexOf(word), 1);

          word.split('').filter(extraLetters => !stolenWord.includes(extraLetters)).forEach(letter => {
            const idx = newBoard.findIndex(tile => tile && tile.toLowerCase() === letter.toLowerCase());
            if (idx !== -1) {
              newBoard[idx] = null;
            }
          });
          setBoard(newBoard);
          scoreboard[1] = Math.max(0, scoreboard[1] - 1);
        } else {
          let newBoard = [...board];
          for (let i = 0; i < word.length; i++) {
            const idx = newBoard.findIndex(letter => letter && letter.toLowerCase() === word[i].toLowerCase());
            if (idx !== -1) {
              newBoard[idx] = null;
            }
          }
          setBoard(newBoard);
        }

        const newScoreboard = [...scoreboard];
        newScoreboard[currentPlayer] += 1;
        setScoreboard(newScoreboard);
        const div = document.createElement('div');
        div.textContent = `Player ${currentPlayer + 1}: ${word}`;
        div.id = word;
        if (currentPlayer === 0) {
          player1words.push(word);
          document.getElementById('validWords1').appendChild(div);
        } else {
          player2words.push(word);
          document.getElementById('validWords2').appendChild(div);
        }
        document.querySelector('input').value = '';
      } else {
        alert('Invalid word!');
      }
    }
  };

  const handleNextPlayer = () => {
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
  };

  const determineWinner = () => {
    if (scoreboard[0] > scoreboard[1]) {
      return `Player 1 is the winner with a score of ${scoreboard[0]}`;
    } else if (scoreboard[1] > scoreboard[0]) {
      return `Player 2 is the winner with a score of ${scoreboard[1]}`;
    } else {
      return 'The game is a draw!';
    }
  };

  if (loading) {
    return <Spinner animation='border' />;
  }

  if (error) {
    return (
      <Alert variant='danger'>
        An error occurred: {error.message}
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </Alert>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffece8', color: '#ce6768', justifyContent: 'center', alignItems: 'center' }}>
      <CardGroup style={{ backgroundColor: '#ffece8', color: '#ce6768', width: '100%', margin: 0 }}>
        <Card>
          <Card.Body>
            <Card.Title><h1 style={{ textAlign: 'center' }}>{scoreboard[0]}</h1></Card.Title>
            <Card.Text>
              <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', lineHeight: 2.5 }}>
                <h3>{player1Name}</h3><br /><br />
                <input type='text' placeholder='Enter a word' onKeyDown={e => handleEnterWord(e, '1')} />
              </div><br /><br />
              {composition.current.length === 0 && <button onClick={() => setPlayer1Done(true)}>Player 1 Done</button>}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'><div id='validWords1'></div></small>
          </Card.Footer>
        </Card>
        <Card style={{ width: '800px' }}>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <div style={{ margin: '10px' }}>
                <table>
                  <thead>
                    <tr style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 50px)', gap: '5px' }}>
                      {board.map((letter, index) => (
                        <div key={index} style={{ width: '50px', height: '50px', backgroundColor: letter === null ? 'beige' : 'lightblue', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', cursor: 'pointer', transition: 'background-color 0.3s ease-in-out' }} onClick={() => handleTileClick(index)}>
                          {letter}
                        </div>
                      ))}
                    </tr>
                  </thead>
                  <tbody />
                </table>
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'></small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title><h1 style={{ textAlign: 'center' }}>{scoreboard[1]}</h1></Card.Title>
            <Card.Text>
              <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', lineHeight: 2.5 }}>
                <h3 style={{ textAlign: 'center' }}>{player2Name}</h3><br /><br />
                <input type='text' placeholder='Enter a word' onKeyDown={e => handleEnterWord(e, '2')} style={{ textAlign: 'center' }} /><br /><br />
                {composition.current.length === 0 && <button onClick={() => setPlayer2Done(true)}>Player 2 Done</button>}
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'><div id='validWords2'></div></small>
          </Card.Footer>
        </Card>
      </CardGroup>
      {player1Done && player2Done && <div><h2>{determineWinner()}</h2></div>}
    </div>
  );
}
