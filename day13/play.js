import {readFileSync} from 'fs'
import Intcode from '../utilities/intcode.js'
import Arcade from './arcade.js'
import Screen from './screen.js'

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

const data = readFileSync('./day13/input.txt', 'utf8');
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

term.close();
