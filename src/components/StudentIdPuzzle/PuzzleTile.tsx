
import React from 'react';
import { cn } from '@/lib/utils';

interface PuzzleTileProps {
  number: number;
  isSelected: boolean;
  isCorrectPosition: boolean;
  onClick: () => void;
  gameWon: boolean;
}

const PuzzleTile: React.FC<PuzzleTileProps> = ({
  number,
  isSelected,
  isCorrectPosition,
  onClick,
  gameWon
}) => {
  return (
    <button
      className={cn(
        "w-full aspect-square rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200",
        "shadow-md hover:shadow-lg active:shadow-sm transform hover:-translate-y-0.5 active:translate-y-0",
        isSelected ? "bg-puzzle-accent text-white scale-105" : "bg-puzzle-tile text-puzzle-tile-text",
        gameWon ? "animate-tile-pop" : "",
        gameWon && isCorrectPosition ? "bg-puzzle-correct" : "",
        !gameWon && isCorrectPosition ? "border-2 border-puzzle-correct" : ""
      )}
      onClick={onClick}
      style={{ animationDelay: `${number * 0.05}s` }}
    >
      {number}
    </button>
  );
};

export default PuzzleTile;
