const [scoresLine, ...gridStrings] = document.querySelector('pre').innerText
  .trim()
  .split('\n\n');

const scores = scoresLine.split(',').map(n => Number(n));

const generateGrids = () => gridStrings.map(gridString => gridString
  .split('\n')
  .map(
    line => line
      .split(/\s+/)
      .filter(s => !!s)
      .map(n => ({number: Number(n), called: false}))
  )
);

const isCompletedGrid = (grid) => {
  // Check Horizontal Lines
  if (grid.some(line => line.every(({called}) => called))) return true;

  // Check Vertical Lines
  for (let i = 0; i < 5; i++) {
    if (grid.every(line => line[i].called)) return true;
  }

  return false;
};

const callNumberForGrid = (number, grid) => {
  grid.forEach(line => line.forEach((entry) => {
    if (entry.number === number) {
      entry.called = true;
      return;
    }
  }));
};

const scoreGrid = (grid) => grid
  .flat()
  .filter(({called}) => !called)
  .map(({number}) => number)
  .reduce((t, n) => t + n)

// Part 1
const grids = generateGrids();

let lastIndex = 0;
let completedGrid = null;

for (lastIndex = 0; lastIndex < scores.length; lastIndex++) {
  grids.forEach(grid => callNumberForGrid(scores[lastIndex], grid));

  completedGrid = grids.find(grid => isCompletedGrid(grid));
  
  if (completedGrid) break;
}

console.log(`first board is ${scoreGrid(completedGrid)} (grid score) * ${scores[lastIndex]} (last score) = ${scoreGrid(completedGrid) * scores[lastIndex]}`);

// Part 2
lastIndex = 0;

let remainingGrids = generateGrids();

for (lastIndex = 0; lastIndex < scores.length; lastIndex++) {
  remainingGrids.forEach(grid => callNumberForGrid(scores[lastIndex], grid));

  if (remainingGrids.length === 1 && isCompletedGrid(remainingGrids[0])) break;

  remainingGrids = remainingGrids.filter(grid => !isCompletedGrid(grid));
}

console.log(`last board is ${scoreGrid(remainingGrids[0])} (grid score) * ${scores[lastIndex]} (last score) = ${scoreGrid(remainingGrids[0]) * scores[lastIndex]}`);
