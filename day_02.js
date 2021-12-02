// Part 1
const directions = document.querySelector('pre').innerText
  .split('\n')
  .map(line => line.split(' '))
  .map(([dir, value]) => [dir, Number(value)]);

let x = 0;
let depth = 0;

directions.forEach(([dir, value]) => {
  if (dir === 'forward') x += value;
  if (dir === 'up') depth -= value;
  if (dir === 'down') depth += value;
});

console.log('Final result')
console.log(`${x} * ${depth} = ${x * depth}`);

// Part 2
x = 0;
depth = 0;
let aim = 0;

directions.forEach(([dir, value]) => {
  if (dir === 'forward') {
    x += value;
    depth += aim * value;
  }

  if (dir === 'up') aim -= value;
  if (dir === 'down') aim += value;
});

console.log('Part 2 result')
console.log(`${x} * ${depth} = ${x * depth}`);