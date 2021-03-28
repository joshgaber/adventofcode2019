import Intcode from '../utilities/intcode.js'

export default class Day5 {
    constructor(data) {
        this.memory = data.split(',').map(data => parseInt(data));
    }

    part1() {
        const machine = new Intcode([...this.memory]);
        machine.pushInputs([1]).run();

        console.log(`diagnostic code for ID 1:`, machine.lastOutput);
    }

    part2() {
        const machine = new Intcode([...this.memory]);
        machine.pushInputs([5]).run();

        console.log(`diagnostic code for ID 5:`, machine.lastOutput);
    }
}
