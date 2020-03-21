const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();
const chars = data.split('\n').map(line => line.split(''));
const locations = {};

for (i in chars) {
  for (j in chars[i]) {
    if (chars[i][j] !== '#') {
      const here = (locations[i + 'x' + j] = {
        char: chars[i][j],
        neighbors: [],
      });
      const left = i - 1 + 'x' + j;
      if (locations.hasOwnProperty(left)) {
        here.neighbors.push(locations[left]);
        locations[left].neighbors.push(here);
      }
      const up = i + 'x' + (j - 1);
      if (locations.hasOwnProperty(up)) {
        here.neighbors.push(locations[up]);
        locations[up].neighbors.push(here);
      }
    }
  }
}

const nonSpaces = Object.keys(locations)
  .filter(l => locations[l].char !== '.')
  .map(l => locations[l]);

const me = nonSpaces.find(l => l.char === '@');
const keys = nonSpaces.filter(l => l.char.match(/^[a-z]$/));

console.log(keys);
