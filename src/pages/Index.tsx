
import React from 'react';
import StudentIdPuzzle from '@/components/StudentIdPuzzle/StudentIdPuzzle';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        <StudentIdPuzzle />
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Student ID Matching Puzzle Game</p>
        <p className="mt-1">Match the sequence to your student ID</p>
      </footer>
    </div>
  );
};

export default Index;
