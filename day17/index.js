const fs = require('fs');
const path = require('path');
const Intcode = require('../utilities/intcode');
const Vacuum = require('./vacuum');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const memory = data.split(',').map(Number);

const machine = new Intcode(memory.slice());
machine.run();

const vacuum = new Vacuum();
vacuum.build(machine.popOutputs());

console.log(vacuum.intersections);
console.log(vacuum.sumOfIntersections);