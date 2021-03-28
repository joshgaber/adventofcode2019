import {readFileSync} from 'fs'
import Intcode from '../utilities/intcode'
import Robot from './robot'
import Screen from './screen'

const data = readFileSync('./day15/input.txt', 'utf8');

const memory = data.split(',').map(Number);
const machine = new Intcode(memory.slice());
const robot = new Robot();

let direction = robot.step();
do {
    machine.pushInputs([direction]);
    machine.run();
    direction = robot.step(machine.popOutputs()[0]);
} while(robot.timesTankFound < 1);

const robot2 = new Robot();

direction = robot2.step();
do {
    machine.pushInputs([direction]);
    machine.run();
    direction = robot2.step(machine.popOutputs()[0]);
} while(robot2.timesTankFound < 4);

new Screen(Object.keys(robot2.explored).map(e => robot2.explored[e])).play();