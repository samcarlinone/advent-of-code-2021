// Part 1
const numbers = document.querySelector('pre').innerText
  .split('\n')
  .map(n => Number.parseInt(n))

let increaseCount = 0;

for (let i = 0; i < numbers.length - 2; i++) {
  if (numbers[i + 1] > numbers[i]) increaseCount++;
}

console.log('Survey says')
console.log(increaseCount);

// Part 2
// comparing the sum of two windows is pointless
// N[X] + N[X + 1] + N[X + 2] < N[X + 1] + N[X + 2] + N[X + 3] = N[X] < N[X + 3]
// cancel out the terms on both sides of the comparison (N[X + 1] + N[X + 2])

let slidingIncreaseCount = 0;

for (let i = 0; i < numbers.length - 4; i++) {
  if (numbers[i + 3] > numbers[i]) slidingIncreaseCount++;
}

console.log('Round 2')
console.log(slidingIncreaseCount)