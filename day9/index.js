const fs = require('fs');
const path = require('path');
const Intcode = require('../utilities/intcode');

data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const memory = data.split(',').map(Number);
let machine1 = new Intcode(memory, [1]);

machine1.run();
console.log('BOOST Keycode', machine1.lastOutput);

let machine2 = new Intcode(memory, [2]);

machine2.run();
console.log('Distress Signal Coordinates', machine2.lastOutput);