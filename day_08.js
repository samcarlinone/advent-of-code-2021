const inputString = document.querySelector('pre').innerText.trim();

const lines = inputString.split('\n').map(line => line.split(' | ').map(part => part.split(' ')));

const uniqueLengths = [2, 4, 3, 7]

// Part 1
const secondHalfCounts = lines
  .map(line => line[1])
  .map(half => half.filter(digits => uniqueLengths.includes(digits.length)).length)
  .reduce((t, n) => t + n);

console.log(`Part 1 count ${secondHalfCounts}`);

// Part 2
const unique = (v, i, a) => a.indexOf(v) === i;

const overlapsBy = (list1, list2, num) => list1.filter(item => list2.includes(item)).length === num;

const analyzeLine = (line) => {
  const firstHalf = line[0].map(digit => digit.split('').sort());
  const output = line[1].map(digit => digit.split('').sort());

  const digits = [...firstHalf, ...output];

  const one = digits.find(digit => digit.length === 2);
  const seven = digits.find(digit => digit.length === 3);
  const four = digits.find(digit => digit.length === 4);
  const eight = digits.find(digit => digit.length === 7);

  const len5 = digits.filter(digit => digit.length === 5).filter(unique);
  const len6 = digits.filter(digit => digit.length === 6).filter(unique);

  const two = len5.find(digit => overlapsBy(digit, four, 2));
  const three = len5.find(digit => overlapsBy(digit, seven, 3));
  const five = len5.find(digit => digit !== two && digit !== three);

  const nine = len6.find(digit => overlapsBy(digit, four, 4));
  const zero = len6.find(digit => digit !== nine && overlapsBy(digit, seven, 3));
  const six = len6.find(digit => digit !== nine && digit !== zero);

  const resultMap = {
    [zero]: 0,
    [one]: 1,
    [two]: 2,
    [three]: 3,
    [four]: 4,
    [five]: 5,
    [six]: 6,
    [seven]: 7,
    [eight]: 8,
    [nine]: 9,
  };

  return output.map(digit => resultMap[digit]).join('');
}

const sum = lines.map(analyzeLine).map(n => Number(n)).reduce((t, n) => t + n);

console.log(`Part 2 sum ${sum}`);
