import React, { useState } from 'react';
import Board from './components/Board';
import Statusmsg from './components/Statusmsg';
import { calculateWinner } from './helpers';
import './styles/root.scss';

const App = () => {
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const [isXNext, setisXNext] = useState(false);
  const winner = calculateWinner(current.board);

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

    setCurrentMove(prev => prev + 1);
  };
  const moveTo = moveTo => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <Statusmsg />
      <Board board={current.board} handleSquareclick={handleSquareclick} />
      <History history={history} moveT0={moveTo} currentMOve={currentMove} />
    </div>
  );
};
export default App;
