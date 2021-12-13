const inputString = document.querySelector('pre').innerText.trim();

const START = 'start';
const END = 'end';

const DEPTH_LIMIT = 100000;

const cavesMap = new Map();

inputString
  .split('\n')
  .forEach(line => {
    const [start, end] = line.split('-');

    let startSet = cavesMap.get(start);
    let endSet = cavesMap.get(end);

    if (!startSet) {
      startSet = new Set();
      cavesMap.set(start, startSet);
    }

    if (!endSet) {
      endSet = new Set();
      cavesMap.set(end, endSet);
    }
    
    if (end !== START) startSet.add(end);
    if (start !== START) endSet.add(start);
  });

// Part 1
const traceAllPaths = (node, visited = []) => {
  if (visited.length > DEPTH_LIMIT) return 0;

  if (node === END) {
    return 1;
  }

  const nextNodes = cavesMap.get(node);

  if (nextNodes === undefined) return 0;
  
  const currentVisited = [...visited, node];

  let count = 0;

  for (let nextNode of nextNodes) {
    if (nextNode !== nextNode.toLowerCase() || !visited.includes(nextNode)) {
      count += traceAllPaths(nextNode, currentVisited);
    }
  }

  return count;
}

console.log(`Part 1 path count ${traceAllPaths(START)}`);

// Part 2
const traceAllPathsPart2 = (node, visited = [], hasVisitedSmallTwice = false) => {
  if (visited.length > DEPTH_LIMIT) return 0;

  if (node === END) {
    return 1;
  }

  const nextNodes = cavesMap.get(node);

  if (nextNodes === undefined) return 0;
  
  const currentVisited = [...visited, node];

  let count = 0;

  for (let nextNode of nextNodes) {
    const isLower = nextNode === nextNode.toLowerCase();

    if (!isLower || !visited.includes(nextNode)) {
      count += traceAllPathsPart2(nextNode, currentVisited, hasVisitedSmallTwice);
    } else {
      if (!hasVisitedSmallTwice) {
        count += traceAllPathsPart2(nextNode, currentVisited, true);
      }
    }
  }

  return count;
}

console.log(`Part 2 path count ${traceAllPathsPart2(START)}`);
