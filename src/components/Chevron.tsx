// src/components/Chevron.tsx
import React from 'react';

const Chevron: React.FC<{ direction?: 'left' | 'right' | 'up' | 'down' }> = ({
  direction = 'right',
}) => {
  const rotations: Record<string, number> = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  };

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <polyline points='9 18 15 12 9 6' />
    </svg>
  );
};

export default Chevron;
