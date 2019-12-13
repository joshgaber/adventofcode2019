const fs = require('fs');
const path = require('path');
const Intcode = require('./intcode');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const memory = data.split(',').map(data => parseInt(data));

let machine = new Intcode(memory.slice(), 1);
machine.run();

console.log(`diagnostic code for ID 1:`, machine.output);

machine = new Intcode(memory.slice(), 5);
machine.run();

console.log(`diagnostic code for ID 5:`, machine.output);