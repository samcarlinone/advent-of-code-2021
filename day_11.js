const inputString = document.querySelector('pre').innerText.trim();

const GENERATION_LIMIT = 100_00;

const width = 10;
const height = 10;

const grid = inputString.split('\n').map(line => line.split('').map(n => Number(n))).flat();

const flashList = new Array(width * height);

const stepGrid = (grid) => {
  flashList.fill(-1);

  let flashInsertIndex = 0;

  // Initial increment
  for (let index = 0; index < width * height; index++) {
    if (++grid[index] === 10) {
      flashList[flashInsertIndex++] = index;
    }
  }

  // Flashes processed
  for (let i = 0; i < flashInsertIndex; i++) {
    const index = flashList[i];

    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (x === 0 && y === 0) continue;

        if (x === -1 && index % width === 0) continue;
        if (x ===  1 && index % width === width - 1) continue;
        if (y === -1 && index / width < 1) continue;
        if (y ===  1 && index / width >= height - 1) continue;

        const newIndex = index + x + y * width;

        if (++grid[newIndex] === 10) flashList[flashInsertIndex++] = newIndex;
      }
    }
  }

  // Set flashed to 0
  for (let i = 0; i < flashInsertIndex; i++) {
    grid[flashList[i]] = 0;
  }

  return flashInsertIndex;
}

// Run the simulation
let flashCount = 0;
let stepFlashCount = 0;

let generation = 0;

while (stepFlashCount < width * height) {
  stepFlashCount = stepGrid(grid);
  flashCount += stepFlashCount;

  generation++;

  if (generation === 100) console.log(`Flash count at generation 100 ${flashCount}`);

  // No infinite loops
  if (generation === GENERATION_LIMIT) {
    console.error(`Halted at ${GENERATION_LIMIT} generations, because of generation limit`);
    break;
  };
}

console.log(`All flashed at generation ${generation}`);
