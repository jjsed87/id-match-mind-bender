
import React, { useEffect, useState } from 'react';

const WinAnimation: React.FC = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const colors = ['#6E59A5', '#1EAEDB', '#4CAF50', '#F97316', '#D946EF', '#FFDD00'];
    const newParticles = [];
    
    // Create more particles for a more visible effect
    for (let i = 0; i < 60; i++) {
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${3 + Math.random() * 4}s`;
      const size = `${10 + Math.random() * 20}px`;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = `${Math.random() * 0.8}s`;
      const rotationSpeed = Math.random() * 360;
      
      newParticles.push(
        <div 
          key={i}
          className="absolute rounded-full animate-confetti"
          style={{
            left,
            top: '-20px',
            width: size,
            height: size,
            backgroundColor: color,
            animationDuration,
            animationDelay: delay,
            transform: `rotate(${rotationSpeed}deg)`,
            boxShadow: '0 0 5px rgba(0,0,0,0.2)',
            zIndex: 100
          }}
        />
      );
    }
    
    setParticles(newParticles);
    
    // Play a celebratory sound (optional)
    const audio = new Audio();
    audio.src = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbMAMzMzMzMzMzMzMzMzMzMzMzMzZmZmZmZmZmZmZmZmZmZmZmZmZmaZmZmZmZmZmZmZmZmZmZmZmZmZmczMzMzMzMzMzMzMzMzMzMzMzMzM//////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAYHf/7jGQAGJI9/KGUYBRZXv5wxjAMYuXlxZiTBiR/P3IowBCCGdutm7x/wwQFP2Pxj8Y/GPxzz0Kg7cVBHJiY0IMmzECBAgQIECBAcPMYPHMYmD9YaYOUCBznx+MfjH4x+MfjH4x+Mfj4Pg+D4Pfx9g61HTqOFjL6WMhgMBgMBCJ4kcceMfjH4wwDGMYxjGMYxjGLy4vLy8vLy8vLy8v/+4xkAB1SNWQigYtjqrqshDBgZLy8vLy8vLKysrKysoIECBAgQIECBAkSJEiRIkVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio play failed:", e));
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles}
    </div>
  );
};

export default WinAnimation;
