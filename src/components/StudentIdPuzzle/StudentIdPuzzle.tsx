
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RotateCcw, Check, HelpCircle } from "lucide-react";
import PuzzleTile from './PuzzleTile';
import GameTimer from './GameTimer';
import GameControls from './GameControls';
import WinAnimation from './WinAnimation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Target sequence is 80117962 (the user's student ID, using first 8 digits)
const TARGET_SEQUENCE = [8, 0, 1, 1, 7, 9, 6, 2];

// Initial array creation with 8 numbers
const createInitialGrid = () => {
  const numbers = [...TARGET_SEQUENCE];
  return shuffleArray(numbers);
};

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: number[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Check if two positions are adjacent (can only move to adjacent spaces)
const areAdjacent = (index1: number, index2: number) => {
  return Math.abs(index1 - index2) === 1;
};

const StudentIdPuzzle: React.FC = () => {
  const [grid, setGrid] = useState<number[]>(createInitialGrid());
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [draggedTile, setDraggedTile] = useState<number | null>(null);
  const { toast } = useToast();

  // Check if current grid matches target sequence
  const checkWinCondition = useCallback(() => {
    return JSON.stringify(grid) === JSON.stringify(TARGET_SEQUENCE);
  }, [grid]);

  // Handler for when a tile is clicked
  const handleTileClick = (index: number) => {
    if (gameWon) return;
    
    if (!gameStarted) {
      setGameStarted(true);
      setTimerActive(true);
    }

    // If no tile is selected yet, select this one
    if (selectedTileIndex === null) {
      setSelectedTileIndex(index);
      return;
    }

    // If the same tile is clicked again, deselect it
    if (selectedTileIndex === index) {
      setSelectedTileIndex(null);
      return;
    }

    // If tiles are adjacent, swap them
    if (areAdjacent(selectedTileIndex, index)) {
      swapTiles(selectedTileIndex, index);
    } else {
      // If tiles are not adjacent, select the new tile
      setSelectedTileIndex(index);
    }
  };

  // Handle drag start
  const handleDragStart = (index: number) => {
    if (gameWon) return;
    
    if (!gameStarted) {
      setGameStarted(true);
      setTimerActive(true);
    }
    
    setDraggedTile(index);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Required to allow dropping
  };

  // Handle drop
  const handleDrop = (index: number) => {
    if (gameWon || draggedTile === null) return;
    
    // If tiles are adjacent, swap them
    if (areAdjacent(draggedTile, index)) {
      swapTiles(draggedTile, index);
    }
    
    setDraggedTile(null);
    setSelectedTileIndex(null);
  };

  // Swap tiles helper function
  const swapTiles = (index1: number, index2: number) => {
    // Create a new grid with the swapped tiles
    const newGrid = [...grid];
    [newGrid[index1], newGrid[index2]] = [newGrid[index2], newGrid[index1]];
    
    setGrid(newGrid);
    setSelectedTileIndex(null);
    setMoves(moves + 1);
    
    // Check if the player won after this move
    setTimeout(() => {
      if (checkWinCondition()) {
        handleWin();
      }
    }, 300);
  };

  // Handle winning the game
  const handleWin = () => {
    setGameWon(true);
    setTimerActive(false);
    toast({
      title: "Puzzle Solved!",
      description: `You matched your Student ID in ${moves} moves and ${formatTime(gameTime)}!`,
      variant: "default"
    });
  };

  // Reset the game
  const resetGame = () => {
    setGrid(createInitialGrid());
    setSelectedTileIndex(null);
    setGameWon(false);
    setMoves(0);
    setGameTime(0);
    setTimerActive(false);
    setGameStarted(false);
    setDraggedTile(null);
  };

  // Format time for display (mm:ss)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (timerActive) {
      interval = window.setInterval(() => {
        setGameTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-puzzle-primary mb-2">Student ID Puzzle</h1>
        <p className="text-gray-600 mb-4">
          Rearrange the numbers to match the Student ID: 
          <span className="font-mono font-bold text-puzzle-accent"> 
            {TARGET_SEQUENCE.join('')}
          </span>
        </p>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex gap-2 items-center mb-2">
              <HelpCircle size={16} />
              How to Play
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>How to Play</SheetTitle>
              <SheetDescription>
                <div className="mt-4 text-left space-y-4">
                  <div>
                    <h3 className="font-bold text-puzzle-primary">Goal</h3>
                    <p>Rearrange the numbers to match your Student ID: <span className="font-mono font-bold">{TARGET_SEQUENCE.join('')}</span></p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-puzzle-primary">How to Move Numbers</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>Click on a number to select it (it will highlight)</li>
                      <li>Click on an adjacent number to swap positions</li>
                      <li>Or drag and drop numbers to adjacent positions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-puzzle-primary">Tips</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>You can only swap adjacent numbers</li>
                      <li>Numbers in the correct position will have a green border</li>
                      <li>Use the reset button to start over</li>
                    </ul>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full bg-puzzle-secondary rounded-xl p-6 shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <GameTimer time={formatTime(gameTime)} />
          <div className="text-puzzle-text font-medium">
            Moves: {moves}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {grid.map((number, index) => (
            <PuzzleTile
              key={index}
              number={number}
              isSelected={selectedTileIndex === index}
              isCorrectPosition={number === TARGET_SEQUENCE[index]}
              onClick={() => handleTileClick(index)}
              gameWon={gameWon}
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              isDraggable={!gameWon}
            />
          ))}
        </div>

        <GameControls 
          onReset={resetGame} 
          gameWon={gameWon}
        />
      </div>

      {gameWon && <WinAnimation />}
    </div>
  );
};

export default StudentIdPuzzle;
