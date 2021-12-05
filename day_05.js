const inputString = document.querySelector('pre').innerText.trim();

const lines = inputString.split('\n')
  .map(line => line.split(' -> ').map(pair => pair.split(',').map(n => Number(n))));

const verticalLines = lines.filter(([c1, c2]) => c1[0] === c2[0]);
const horizontalLines = lines.filter(([c1, c2]) => c1[1] === c2[1]);

const touchedPoints = {};

verticalLines.forEach(([c1, c2]) => {
  const x = c1[0];

  const yMin = Math.min(c1[1], c2[1]);
  const yMax = Math.max(c1[1], c2[1]);

  for (let y = yMin; y <= yMax; y++) {
    const coord = `${x},${y}`;
    touchedPoints[coord] = (touchedPoints[coord] ?? 0) + 1;
  }
});

horizontalLines.forEach(([c1, c2]) => {
  const y = c1[1];

  const xMin = Math.min(c1[0], c2[0]);
  const xMax = Math.max(c1[0], c2[0]);

  for (let x = xMin; x <= xMax; x++) {
    const coord = `${x},${y}`;
    touchedPoints[coord] = (touchedPoints[coord] ?? 0) + 1;
  }
});

// Part 1
const atLeastTwoCount = Object.values(touchedPoints).filter(n => n >= 2).length;

console.log(`There are ${atLeastTwoCount} points with at least two vents`);

// Part 2
const diagonalLines = lines.filter(([c1, c2]) => c1[0] !== c2[0] && c1[1] !== c2[1]);

diagonalLines.forEach(([c1, c2]) => {
  const xMin = Math.min(c1[0], c2[0]);
  const xMax = Math.max(c1[0], c2[0]);

  const yMin = Math.min(c1[1], c2[1]);
  const yMax = Math.max(c1[1], c2[1]);

  // Do we read left to right? If yes, is the y getting smaller? If yes, "/" else "\".
  if (c1[0] < c2[0] ? c1[1] > c2[1] : c1[1] < c2[1]) {  
    // "/" diagonal
    for (let x = xMin; x <= xMax; x++) {
      const y = yMax - (x - xMin);
      const coord = `${x},${y}`;
      touchedPoints[coord] = (touchedPoints[coord] ?? 0) + 1;
    }
  } else {
    // "\" diagonal
    for (let x = xMin; x <= xMax; x++) {
      const y = (x - xMin) + yMin;
      const coord = `${x},${y}`;
      touchedPoints[coord] = (touchedPoints[coord] ?? 0) + 1;
    }
  }

  
});

const atLeastTwoCountWithDiagonals = Object.values(touchedPoints).filter(n => n >= 2).length;

console.log(`Including diagonals there are ${atLeastTwoCountWithDiagonals} points with at least two vents`);
