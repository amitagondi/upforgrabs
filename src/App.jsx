import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export function App(props) {
  const [board, setBoard] = useState([]);
  const [updatedBoard, setUpdatedBoard] = useState([]);
  const [words, setWords] = useState([]);
  const [player1words, setPlayer1Words] = useState([]);
  const [player2words, setPlayer2Words] = useState([]);
  const [numPlayers, setNumPlayers] = useState(props.numPlayers);
  [currentPlayer, setCurrentPlayer] = useState(0);
  const [scoreboard, setScoreboard] = useState([0, 0]);
  const [player1Name] = props.player1Name;
  const [player2Name] = props.player2Name;

  const composition = [
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'i',
    'i',
    'b',
    'b',
    'c',
    'c',
    'd',
    'd',
    'd',
    'e',
    'e',
    'e',
    'e',
    'e',
    'f',
    'f',
    'g',
    'g',
    'h',
    'h',
    'i',
    'i',
    'i',
    'i',
    'j',
    'j',
    'k',
    'k',
    'l',
    'l',
    'l',
    'm',
    'm',
    'n',
    'n',
    'n',
    'n',
    'o',
    'o',
    'o',
    'o',
    'p',
    'p',
    'q',
    'q',
    'r',
    'r',
    'r',
    'r',
    's',
    's',
    's',
    's',
    't',
    't',
    't',
    't',
    'u',
    'u',
    'u',
    'v',
    'v',
    'w',
    'w',
    'x',
    'x',
    'y',
    'y',
    'z',
    'z',
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
    let letter = composition[randomIndex];
    board.push(letter);
    updatedBoard.push(letter);
    composition.splice(randomIndex, 1);
    handleNextPlayer();
  };

  //   const handleFlipTileButton = player => {
  //   const disabled = currentPlayer !== player;
  //   return (
  //     <button
  //       key={player}
  //       disabled={disabled}
  //       onClick={() => handleFlipTile()}
  //       style={{ backgroundColor: '#ffece8', padding: 20, color: '#ce6768' }}
  //     >
  //       Flip Tile
  //     </button>
  //   );
  // };

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
    player1words.forEach(p1word => {
      console.log('ented p1');
      generateCombinations(updatedBoard, 3).forEach(letter => {
        console.log('ented ub1');
        console.log('this is the letter:' + letter);
        l1 = [];
        p1word.split('').every(currentValue => l1.push(currentValue));
        letter.every(lett => l1.push(lett));
        // l1.push(letter);
        console.log('l1: ' + l1);
        l1 = l1.sort();
        word1 = word.split('').sort();
        console.log(l1);
        console.log(word1);
        if (l1.every((letter, index) => word1[index] === letter)) {
          console.log('entered stolen1:');
          stolen = true;
          finWord = p1word;
          return [stolen, finWord];
        }
        return [stolen, finWord];
      });
    });
    return [stolen, finWord];
  };
  const stolenFromP2 = (player2words, updatedBoard, word) => {
    let stolen = false;
    let finWord = '';
    player2words.forEach(p2word => {
      console.log('ented p2');
      generateCombinations(updatedBoard, 3).forEach(letter => {
        console.log('ented ub2');
        console.log('this is the letter:' + letter);
        l2 = [];
        p2word.split('').every(currentValue => l2.push(currentValue));
        l2.push(letter);
        console.log('l2: ' + l2);
        l2 = l2.sort();
        word2 = word.split('').sort();
        console.log(l2);
        console.log(word2);
        if (l2.every((letter, index) => word2[index] === letter)) {
          console.log('entered stolen2:');
          stolen = true;
          finWord = p2word;
          return [stolen, finWord];
        }
        return [stolen, finWord];
      });
    });
    return [stolen, finWord];
  };
  const handleEnterWord = (e, playerNumber) => {
    currentPlayer = playerNumber - 1;
    const word = e.target.value;
    const key = e.key;
    const isValidWord = words.includes(word);
    if (word.length >= 4 && key === 'Enter') {
      if (!isValidWord) {
        alert('Invalid word!');
      }
      console.log('word is in dict:' + isValidWord);
      let [stolen1, stolenWord1] = stolenFromP1(
        player1words,
        updatedBoard,
        word
      );
      console.log(stolen1);
      console.log(stolenWord1);
      let [stolen2, stolenWord2] = stolenFromP2(
        player2words,
        updatedBoard,
        word
      );
      console.log(stolen2);
      console.log(stolenWord2);
      let stolenWord = '';
      if (stolenWord1.length > 0) stolenWord = stolenWord1;
      else if (stolenWord2.length > 0) stolenWord = stolenWord2;

      console.log('player1words:' + player1words);
      console.log('player2words:' + player2words);
      console.log(word);
      console.log(
        word
          .toLowerCase()
          .split('')
          .every(currentValue => updatedBoard.includes(currentValue))
      );
      console.log(stolen1);
      console.log(stolen2);
      console.log(stolenWord);
      console.log(updatedBoard);
      console.log(player1words);
      console.log(player2words);
      if (
        isValidWord &&
        (word
          .toLowerCase()
          .split('')
          .every(currentValue => updatedBoard.includes(currentValue)) ||
          stolenWord.length > 0)
      ) {
        console.log('stolenWord: ' + stolenWord);
        if (stolen1) {
          //just remove old one
          const div = document.createElement('div');
          div.textContent = `Player ${1}: ${stolenWord}`;
          document
            .getElementById('validWords1')
            .removeChild(document.getElementById(stolenWord));
          player1words.splice(player1words.indexOf(word), 1);
          word
            .split('')
            .filter(extraLetters => !stolenWord.includes(extraLetters))
            .forEach(letter => {
              updatedBoard.splice(updatedBoard.indexOf(letter), 1);
            });
          scoreboard[0] -= 1;
        } else if (stolen2) {
          const div = document.createElement('div');
          div.textContent = `Player ${2}: ${stolenWord}`;
          document
            .getElementById('validWords2')
            .removeChild(document.getElementById(stolenWord));
          player2words.splice(player2words.indexOf(word), 1);

          word
            .split('')
            .filter(extraLetters => !stolenWord.includes(extraLetters))
            .forEach(letter => {
              updatedBoard.splice(updatedBoard.indexOf(letter), 1);
            });
          scoreboard[1] -= 1;
        } else {
          for (let i = 0; i < word.length; i++) {
            const idx = updatedBoard.indexOf(word[i].toLowerCase());
            updatedBoard.splice(idx, 1);
          }
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

  const handleFlipTileButton = player => {
    const disabled = currentPlayer !== player;
    return (
      <button
        key={player}
        disabled={disabled}
        onClick={() => handleFlipTile()}
        style={{ backgroundColor: '#ffece8', padding: 20, color: '#ce6768' }}
      >
        Flip Tile
      </button>
    );
  };

  return (
    <div
      style={{
        backgroundColor: '#ffece8',
        color: '#ce6768',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CardGroup
        style={{
          backgroundColor: '#ffece8',
          color: '#ce6768',
          width: 1000,
          margin: 0,
        }}
      >
        <Card>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <div
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  lineHeight: 2.5,
                }}
              >
                <h1>{scoreboard[0]}</h1>
                <h3>{player1Name}</h3>
                {handleFlipTileButton(0)}
                <br />
                <br />
                <input
                  type='text'
                  placeholder='Enter a word'
                  onKeyDown={e => handleEnterWord(e, '1')}
                />
              </div>
              <br />
              <br />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'>
              <div id='validWords1'></div>
            </small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <div style={{ margin: '10px' }}>
                <table>
                  <thead>
                    <tr
                      style={{
                        backgroundColor: '#ffece8',
                        padding: 50,
                        color: '#ce6768',
                        bordercolor: '#ce6768',
                      }}
                    >
                      {Array(50)
                        .fill('')
                        .map((_, i) => (
                          <th
                            key={i}
                            style={
                              {
                                // border: '1px solid #ce6768',
                              }
                            }
                          >
                            {updatedBoard[i]}
                          </th>
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
            <Card.Title></Card.Title>
            <Card.Text>
              <div
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  lineHeight: 2.5,
                }}
              >
                <h1 style={{ textAlign: 'center' }}>{scoreboard[1]}</h1>
                <h3 style={{ textAlign: 'center' }}>{player2Name}</h3>
                {handleFlipTileButton(1)}
                <br />
                <br />
                <input
                  type='text'
                  placeholder='Enter a word'
                  onKeyDown={e => handleEnterWord(e, '2')}
                  style={{ textAlign: 'center' }}
                />
                <br />
                <br />
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'>
              <div id='validWords2'></div>
            </small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
  );
}
