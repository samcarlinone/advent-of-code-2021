const inputString = document.querySelector('pre').innerText.trim();

const height = inputString.split('\n').length;
const width = inputString.split('\n')[0].length;

const map = inputString.split('\n').map(line => line.trim().split('')).flat().map(n => Number(n));

const basinPoints = [];

const getPoint = (x, y) => {
  if (x < 0 || (width - 1) < x) return 10;
  if (y < 0 || (height - 1) < y) return 10;

  return map[x + y * width];
}

// Part 1
let risk = 0;

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const center = getPoint(x, y);

    if (getPoint(x - 1, y) <= center) continue;
    if (getPoint(x + 1, y) <= center) continue;
    if (getPoint(x, y - 1) <= center) continue;
    if (getPoint(x, y + 1) <= center) continue;

    // Keep track of minima for spawning our basin flood fills later
    basinPoints.push([x, y]);

    risk += center + 1;
  }
}

console.log(`Sum of all risks = ${risk}`)

// Part 2
const basins = {};
const ownedPoints = {};

const ownPoint = (x, y) => ownedPoints[`${x},${y}`] = true;
const isOwned = (x, y) => ownedPoints[`${x},${y}`];

for (let [bx, by] of basinPoints) {
  const basin = basins[`${bx},${by}`] = {size: 0};

  const flood = [[bx,by]];

  while(flood.length) {
    const [x, y] = flood.shift();

    const lastHeight = getPoint(x, y);

    if (getPoint(x, y) >= 9) continue;

    basin.size++;
    ownPoint(x, y);

    if (getPoint(x - 1, y) > lastHeight && !isOwned(x - 1, y)) {
      flood.push([x - 1, y]);
      ownPoint(x - 1, y);
    }

    if (getPoint(x + 1, y) > lastHeight && !isOwned(x + 1, y)) {
      flood.push([x + 1, y]);
      ownPoint(x + 1, y);
    }

    if (getPoint(x, y - 1) > lastHeight && !isOwned(x, y - 1)) {
      flood.push([x, y - 1]);
      ownPoint(x, y - 1);
    }

    if (getPoint(x, y + 1) > lastHeight && !isOwned(x, y + 1)) {
      flood.push([x, y + 1]);
      ownPoint(x, y + 1);
    }
  }
}

const topThreeBasins = Object.values(basins).map(basin => basin.size).sort((a, b) => b - a).slice(0, 3);

console.log(`Product of top three basin sizes = ${topThreeBasins.reduce((t, n) => t * n)}`);
