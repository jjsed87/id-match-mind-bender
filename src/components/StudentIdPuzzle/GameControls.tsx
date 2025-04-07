
import React from 'react';
import { Button } from "@/components/ui/button";
import { RotateCcw, Check } from "lucide-react";

interface GameControlsProps {
  onReset: () => void;
  gameWon: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ onReset, gameWon }) => {
  return (
    <div className="flex justify-center mt-4">
      <Button 
        onClick={onReset}
        variant="outline" 
        className="flex items-center gap-2 bg-white border-puzzle-primary text-puzzle-primary hover:bg-puzzle-secondary"
      >
        <RotateCcw size={16} />
        {gameWon ? "Play Again" : "Restart"}
      </Button>
      
      {gameWon && (
        <Button 
          className="ml-3 bg-puzzle-correct hover:bg-puzzle-correct/90 flex items-center gap-2"
        >
          <Check size={16} />
          Solved!
        </Button>
      )}
    </div>
  );
};

export default GameControls;
