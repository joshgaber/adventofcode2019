const fs = require('fs');
const path = require('path');
const Intcode = require('../utilities/intcode');
const Robot = require('./robot');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const memory = data.split(',').map(Number);
const machine = new Intcode(memory.slice());
const robot = new Robot();

let direction = robot.step();
do {
    machine.pushInputs([direction]);
    machine.run();
    direction = robot.step(machine.popOutputs()[0]);
} while(robot.timesTankFound < 1);

console.log('Steps to tank:', robot.tank.depth);

const robot2 = new Robot();

direction = robot2.step();
do {
    machine.pushInputs([direction]);
    machine.run();
    direction = robot2.step(machine.popOutputs()[0]);
} while(robot2.timesTankFound < 4);
console.log('Time for oxygen to fill ship:', robot2.maxDepth);
