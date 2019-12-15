const fs = require('fs');
const path = require('path');
const Intcode = require('../utilities/intcode');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const memory = data.split(',').map(data => parseInt(data));

let machine = new Intcode(memory.slice());
machine.pushInputs([1]).run();

console.log(`diagnostic code for ID 1:`, machine.lastOutput);

machine = new Intcode(memory.slice());
machine.pushInputs([5]).run();

console.log(`diagnostic code for ID 5:`, machine.lastOutput);