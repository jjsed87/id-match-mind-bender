
import React, { useEffect, useState } from 'react';

const WinAnimation: React.FC = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const colors = ['#6E59A5', '#1EAEDB', '#4CAF50', '#F97316', '#D946EF'];
    const newParticles = [];
    
    for (let i = 0; i < 30; i++) {
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${3 + Math.random() * 2}s`;
      const size = `${10 + Math.random() * 15}px`;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = `${Math.random() * 0.5}s`;
      
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
            animationDelay: delay
          }}
        />
      );
    }
    
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles}
    </div>
  );
};

export default WinAnimation;
