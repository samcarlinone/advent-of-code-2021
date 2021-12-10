const inputString = document.querySelector('pre').innerText.trim();

const pairs = {
  '{': '}',
  '(': ')',
  '[': ']',
  '<': '>',
};

const values = {
 ')': 3,
 ']': 57,
 '}': 1197,
 '>': 25137,
};

const autoCompleteValues = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

let score = 0;

const autoCompleteScores = inputString
  .split('\n')
  .map(line => {
    const stack = [];

    const isCorrupted = [...line].some(c => {
      if (pairs[c]) {
        stack.push(c);
      } else {
        if (pairs[stack.pop()] !== c) {
          score += values[c];
          return true;
        }
      }
    });

    if (isCorrupted) return null;

    let aScore = 0;

    for (let i = stack.length - 1; i >= 0; i--) {
      aScore = aScore * 5 + autoCompleteValues[stack[i]];
    }

    return aScore;
  })
  .filter(score => score !== null)
  .sort((a, b) => a - b);

console.log(`Syntax checker score is ${score}`);

const middleAutoScore = autoCompleteScores[Math.floor(autoCompleteScores.length / 2)];

console.log(`Auto-complete score is ${middleAutoScore}`);


