import React, { useState } from 'react';
import Board from './components/Board';
import Statusmsg from './components/Statusmsg';
import { calculateWinner } from './helpers';
import './styles/root.scss';

const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const { winner, winningSquares } = calculateWinner(current.board);

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
  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC </span> TOE
      </h1>
      <Statusmsg winner={winner} current={current} />
      <Board
        board={current.board}
        handleSquareclick={handleSquareclick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start New Game
      </button>
      <h2 style={{ fontWeight: 'normal' }}> Current Game HIstory</h2>

      <History history={history} moveT0={moveTo} currentMOve={currentMove} />
      <div className="bg-balls" />
    </div>
  );
};
export default App;
