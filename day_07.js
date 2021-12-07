const inputString = document.querySelector('pre').innerText.trim();

const positions = inputString.split(',').map(n => Number(n));

const xMin = positions.reduce((min, x) => Math.min(min, x));
const xMax = positions.reduce((max, x) => Math.max(max, x));


// Part 1
const calculateFuel = (positions, target) => positions.map(x => Math.abs(x - target)).reduce((t, dx) => t + dx);

let bestFuel = Number.MAX_SAFE_INTEGER;

for (let x = xMin; x <= xMax; x++) {
  bestFuel = Math.min(bestFuel, calculateFuel(positions, x));
}

console.log(`Least fuel is ${bestFuel}`);

// Part 2
const calculateIncreasingFuel = (positions, target) => positions.map(x => {
  const dist = Math.abs(x - target);
  return dist * (dist + 1) / 2;
}).reduce((t, dx) => t + dx);

bestFuel = Number.MAX_SAFE_INTEGER;

for (let x = xMin; x <= xMax; x++) {
  bestFuel = Math.min(bestFuel, calculateIncreasingFuel(positions, x));
}

console.log(`Least fuel for part 2 is ${bestFuel}`);
