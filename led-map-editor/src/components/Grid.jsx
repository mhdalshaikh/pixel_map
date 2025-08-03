import React, { useState, useEffect } from 'react';

export default function Grid({ colors, onCellClick }) {
  const [isDragging, setIsDragging] = useState(false);
  const rows = colors.length;
  const cols = colors[0]?.length || 0;

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 24px)`,
        gap: '2px',
        userSelect: 'none',
      }}
    >
      {colors.map((row, r) =>
        row.map((color, c) => (
          <div
            key={`${r}-${c}`}
            onMouseDown={() => {
              setIsDragging(true);
              onCellClick(r, c);
            }}
            onMouseEnter={() => {
              if (isDragging) onCellClick(r, c);
            }}
            style={{
              width: 24,
              height: 24,
              backgroundColor: color,
              cursor: 'pointer',
            }}
          />
        ))
      )}
    </div>
  );
}