import React, { useState } from 'react';
import Grid from './components/Grid';
import './index.css';

function App() {
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState('#ff0000');

  const buildGrid = () => {
    const initial = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => '#EEEEEE')
    );
    setColors(initial);
  };

  const handleCellClick = (r, c) => {
    setColors(prev => {
      const copy = prev.map(row => [...row]);
      copy[r][c] = currentColor;
      return copy;
    });
  };

  const exportMap = () => {
    if (!colors.length) return alert('Build a grid first!');
    const lines = [`${width},${height}`, ...colors.map(row => row.join(','))];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ledmap.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <div className="controls">
        <label>
          Width:
          <input
            type="number"
            value={width}
            min={1}
            onChange={e => setWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            min={1}
            onChange={e => setHeight(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
        <label style={{ marginLeft: 16 }}>
          Pick Color:
          <input
            type="color"
            value={currentColor}
            onChange={e => setCurrentColor(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>
        <button onClick={buildGrid} style={{ marginLeft: 16 }}>
          Build Grid
        </button>
        <button onClick={exportMap} style={{ marginLeft: 8 }}>
          Export Map
        </button>
      </div>

      <div className="grid-wrapper">
        {colors.length > 0 && (
          <Grid colors={colors} onCellClick={handleCellClick} />
        )}
      </div>
    </div>
  );
}

export default App;