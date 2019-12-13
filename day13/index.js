const fs = require('fs');
const path = require('path');
const Intcode = require('./intcode');
const Arcade = require('./arcade');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const memory = data.split(',').map(Number);

const machine = new Intcode(memory.slice());
machine.run();

const game = new Arcade();
game.build(machine.popOutputs());
const map = game.tiles;

const mapHash = {};
map.forEach(m => mapHash[`${m.x}x${m.y}`] = m.id);

blockCount = Object.keys(mapHash).filter(i => mapHash[i] === 2).length;

console.log(`Block count:`, blockCount);
