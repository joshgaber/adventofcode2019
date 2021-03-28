import Intcode from '../utilities/intcode'
import Robot from './robot'

export default class Day15 {
    private machine: Intcode;

    constructor(data: string) {
        const memory = data.split(',').map(Number);
        this.machine = new Intcode(memory);
    }

    part1() {
        const robot = new Robot();

        let direction = robot.step();
        do {
            this.machine.pushInputs([direction]);
            this.machine.run();
            direction = robot.step(this.machine.popOutputs()[0]);
        } while(robot.timesTankFound < 1);

        console.log('Steps to tank:', robot.tank.depth);
    }

    part2() {
        const robot2 = new Robot();

        let direction = robot2.step();
        do {
            this.machine.pushInputs([direction]);
            this.machine.run();
            direction = robot2.step(this.machine.popOutputs()[0]);
        } while(robot2.timesTankFound < 4);
        console.log('Time for oxygen to fill ship:', robot2.maxDepth);
    }
}
