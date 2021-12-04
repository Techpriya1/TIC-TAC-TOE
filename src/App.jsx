import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';

import { calculateWinner } from './helpers';
import './styles/root.scss';

const App = () => {
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);
  const [currentMove, setcurrentMove] = useState(0);
  const current = history[currentMove];

  const [isXNext, setisXNext] = useState(false);
  const winner = calculateWinner(current.board);

  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${current.isXNext ? 'X' : 'O'}`;

  const handleSquareclick = position => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square;
      });

      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });

    setcurrentMove(prev => prev + 1);
  };
  const moveTo = moveTo => {
    setcurrentMove(move);
  };

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <h2>{message}</h2>
      <Board board={current.board} handleSquareclick={handleSquareclick} />
      <History history={history} moveT0={moveTo} currentMOve={currentMove} />
    </div>
  );
};
export default App;
