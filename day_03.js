const lines = document.querySelector('pre').innerText
  .split('\n')
  .map(line => line.split(''));

const bitCounts = new Array(lines[0].length).fill(0);

lines.forEach((line) => line.forEach((bit, index) => bitCounts[index] += (bit === '0' ? -1 : 1)));

// Part 1
const gammaRate = parseInt(bitCounts.map((count) => count > 0 ? '1' : '0').join(''), 2);
const epsilonRate = parseInt(bitCounts.map((count) => count <= 0 ? '1' : '0').join(''), 2);

console.log(`${gammaRate} (Gamma Rate) * ${epsilonRate} Epsilon Rate = ${gammaRate * epsilonRate}`);

// Part 2
let oxyLines = lines;
let co2Lines = lines;

for (let i = 0; i < lines[0].length; i++) {
  oxyLines = oxyLines.filter((line) => line[i] === (bitCounts[i] < 0 ? '0' : '1'));

  if (oxyLines.length === 1) break;
  else {
    bitCounts.fill(0);
    oxyLines.forEach((line) => line.forEach((bit, index) => bitCounts[index] += (bit === '0' ? -1 : 1)));
  }
}

lines.forEach((line) => line.forEach((bit, index) => bitCounts[index] += (bit === '0' ? -1 : 1)));

for (let i = 0; i < lines[0].length; i++) {
  co2Lines = co2Lines.filter((line) => line[i] === (bitCounts[i] < 0 ? '1' : '0'));

  if (co2Lines.length === 1) break;
  else {
    bitCounts.fill(0);
    co2Lines.forEach((line) => line.forEach((bit, index) => bitCounts[index] += (bit === '0' ? -1 : 1)));
  }
}

const oxyRating = parseInt(oxyLines[0].join(''), 2)
const co2Rating = parseInt(co2Lines[0].join(''), 2)


console.log(`${oxyRating} (Oxygen Generator Rating) * ${co2Rating} (CO2 Scrubber Rating) = ${oxyRating * co2Rating}`);
