import React from 'react';

export default function Grid({ colors, onCellClick }) {
  const rows = colors.length;
  const cols = colors[0]?.length || 0;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 24px)`,
        gap: '2px',
      }}
    >
      {colors.map((row, r) =>
        row.map((color, c) => (
          <div
            key={`${r}-${c}`}
            onClick={() => onCellClick(r, c)}
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
