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

blockCount = Object.keys(map).filter(i => map[i].id === 2).length;

console.log(`Block count:`, blockCount);

// Part 2

const machine2 = new Intcode(memory.slice());
machine2.memory[0] = 2;
const game2 = new Arcade();

do {
    const finished = machine2.run();
    game2.build(machine2.popOutputs());
    if (finished) break;
    machine2.pushInputs([game2.getJoystick()]);
} while(true);

console.log(`Final score:`, game2.score);
