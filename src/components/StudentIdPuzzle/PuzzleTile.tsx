
import React from 'react';
import { cn } from '@/lib/utils';
import { Move } from 'lucide-react';

interface PuzzleTileProps {
  number: number;
  isSelected: boolean;
  isCorrectPosition: boolean;
  onClick: () => void;
  gameWon: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  isDraggable?: boolean;
}

const PuzzleTile: React.FC<PuzzleTileProps> = ({
  number,
  isSelected,
  isCorrectPosition,
  onClick,
  gameWon,
  onDragStart,
  onDragOver,
  onDrop,
  isDraggable = false
}) => {
  return (
    <button
      className={cn(
        "w-full aspect-square rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200 relative",
        "shadow-md hover:shadow-lg active:shadow-sm transform hover:-translate-y-0.5 active:translate-y-0",
        isSelected ? "bg-puzzle-accent text-white scale-105" : "bg-puzzle-tile text-puzzle-tile-text",
        gameWon ? "animate-tile-pop" : "",
        gameWon && isCorrectPosition ? "bg-puzzle-correct" : "",
        !gameWon && isCorrectPosition ? "border-2 border-puzzle-correct" : "",
        isDraggable ? "cursor-grab active:cursor-grabbing" : ""
      )}
      onClick={onClick}
      style={{ animationDelay: `${number * 0.05}s` }}
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {number}
      {isDraggable && !gameWon && (
        <div className="absolute top-1 right-1 opacity-50">
          <Move size={12} />
        </div>
      )}
    </button>
  );
};

export default PuzzleTile;
