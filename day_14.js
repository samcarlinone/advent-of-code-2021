const inputString = document.querySelector('pre').innerText.trim();

const [templateString, rulesString] = inputString.split('\n\n');

const rules = rulesString
  .split('\n')
  .map(line => line.split(' -> '))
  .reduce((obj, [pair, result]) => {
    obj[pair] = result;
    return obj;
  }, {});

const mergeCounts = (base, ...countObjects) => {
  const counts = {...base};

  countObjects.forEach(obj => {
    Object.entries(obj).forEach(([key, count]) => counts[key] = (counts[key] ?? 0) + count);
  });

  return counts;
}

const memo = {};

const expandPair = (leftChar, rightChar, remainingIterations) => {
  const pair = leftChar + rightChar;
  const memoKey = `${pair}-${remainingIterations}`;

  const memoResult = memo[memoKey];
  if (memoResult) return memoResult;

  const centralChar = rules[pair];

  if (remainingIterations === 0) return {};

  const leftPairCounts = expandPair(leftChar, centralChar, remainingIterations - 1);
  const rightPairCounts = expandPair(centralChar, rightChar, remainingIterations - 1);

  const counts = mergeCounts(leftPairCounts, rightPairCounts, {[centralChar]: 1});
  memo[memoKey] = counts;
  return counts;
}

const countPolymer = (template, generationCount) => {
  let counts = [...template].reduce((obj, c) => {
    obj[c] = (obj[c] ?? 0) + 1;
    return obj;
  }, {});

  for (let i = 1; i < template.length; i++) {
    counts = mergeCounts(counts, expandPair(template[i - 1], template[i], generationCount));
  }

  return counts;
}

const getMinAndMax = (list) => list.reduce(([min, max], n) => [Math.min(min, n), Math.max(max, n)], [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]);

let result10 = countPolymer(templateString, 10);
let result40 = countPolymer(templateString, 40);


const [min10, max10] = getMinAndMax(Object.values(result10));
const [min40, max40] = getMinAndMax(Object.values(result40));

console.log(max10 - min10);
console.log(max40 - min40);
