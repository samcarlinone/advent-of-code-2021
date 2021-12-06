const inputString = document.querySelector('pre').innerText.trim();

const initialFishAges = inputString.split(',').map(n => Number(n));

const fishAges = new Array(9).fill(0);

initialFishAges.forEach(n => fishAges[n] += 1);

const simulateStep = (ages) => {
  const newFish = ages[0];

  for (let i = 1; i < ages.length; i++) {
    ages[i - 1] = ages[i];
  }

  ages[6] += newFish;
  ages[8] = newFish;
}

// Part 1
for (let generations = 0; generations < 80; generations++) simulateStep(fishAges);

console.log(`After 80 generations there will be ${fishAges.reduce((t, n) => t + n)} fish`);

// Part 2
for (let generations = 0; generations < 256 - 80; generations++) simulateStep(fishAges);

console.log(`After 256 generations there will be ${fishAges.reduce((t, n) => t + n)} fish`);
