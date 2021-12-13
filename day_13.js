const inputString = document.querySelector('pre').innerText.trim();

const [dotsString, foldString] = inputString.split('\n\n');

const dots = dotsString.split('\n').map(line => line.split(',').map(n => Number(n)));

const folds = foldString.split('\n').map(line => line.split(' ').slice(-1)[0].split('='));

const executeFold = (dots, [axis, value]) => (
  dots.map(point => {
    if (axis === 'x') {
      if (point[0] < value) return point;
      else return [value * 2 - point[0], point[1]];
    } else {
      if (point[1] < value) return point;
      else return [point[0], value * 2 - point[1]];
    }
  })
)

// Part 1
const newDots = executeFold(dots, folds[0])

const dotCount = new Set(newDots.map(([x, y]) => `${x}-${y}`)).size;

console.log(dotCount)

// Part 2
let part2Dots = dots;

for (let fold of folds)
  part2Dots = executeFold(part2Dots, fold);

const xMax = part2Dots.reduce((max, [x]) => Math.max(max, x), -1);
const yMax = part2Dots.reduce((max, [_, y]) => Math.max(max, y), -1);

let result = ''

for (let y = 0; y <= yMax; y++) {
  let line = []

  for (let x = 0; x <= xMax; x++) {
    line.push(part2Dots.some(([px, py]) => px === x && py === y) ? '*' : ' ');
  }

  result += line.join('') + '\n';
}

console.log(result);
