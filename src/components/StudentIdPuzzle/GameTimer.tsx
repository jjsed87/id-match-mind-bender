
import React from 'react';

interface GameTimerProps {
  time: string;
}

const GameTimer: React.FC<GameTimerProps> = ({ time }) => {
  return (
    <div className="bg-white bg-opacity-80 px-3 py-1 rounded-md shadow text-puzzle-text font-mono font-medium">
      ⏱️ {time}
    </div>
  );
};

export default GameTimer;
