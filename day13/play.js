const fs = require('fs');
const path = require('path');
const Intcode = require('./intcode');
const Arcade = require('./arcade');
const Screen = require('./screen');

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const memory = data.split(',').map(Number);

const machine = new Intcode(memory.slice());
machine.memory[0] = 2;
const game = new Arcade();

const term = new Screen(23, 35);

do {
    const finished = machine.run();
    game.build(machine.popOutputs());
    if (finished) break;
    machine.pushInputs([game.getJoystick()]);
    term.updateInput(game.tiles, game.score);
    wait(50);
} while(true);
