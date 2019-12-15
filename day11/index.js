const fs = require('fs');
const path = require('path');
const Intcode = require('../utilities/intcode');
const Painter = require('./painter');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const memory = data.split(',').map(Number);

const machine = new Intcode(memory.slice());
const painter = new Painter();

let completed = false;
do {
    completed = machine.run();
    painter.run(machine.popOutputs());
    machine.pushInputs([painter.currentColor]);
} while(!completed);

let painted = painter.painted.slice();

let grid = {};
for (const p in painted) {
    grid[`${painted[p].x}x${painted[p].y}`] = painted[p].color;
}

console.log(`painted panels:`, Object.keys(grid).length);
console.log();



const machine2 = new Intcode(memory.slice());
const painter2 = new Painter([{
    x: 0, y: 0, color: 1
}]);

completed = false;
do {
    completed = machine2.run();
    painter2.run(machine2.popOutputs());
    machine2.pushInputs([painter2.currentColor]);
} while(!completed);

printout(painter2.painted.slice());



function printout(painted) {
    const minX = painted.reduce((a, b) => Math.min(a, b.x), 0);
    const maxX = painted.reduce((a, b) => Math.max(a, b.x), 0);
    const minY = painted.reduce((a, b) => Math.min(a, b.y), 0);
    const maxY = painted.reduce((a, b) => Math.max(a, b.y), 0);

    let display = Array(maxY - minY + 1).fill(0);
    for (const i in display) {
        display[i] = Array(maxX - minX + 1).fill(0);
    }

    for (const a in painted) {
        const p = painted[a];
        display[p.y - minY][p.x - minX] = p.color;
    }

    let printout = display.map(x => x.join('')).join('\n');
    console.log(printout.replace(/1/g, '\u2588').replace(/0/g, ' '));
}