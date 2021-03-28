import Intcode from "../utilities/intcode.js";

export default class Day9 {
    constructor(data) {
        this.memory = data.split(',').map(Number);
    }

    part1() {
        let machine1 = new Intcode(this.memory, [1]);

        machine1.run();
        console.log('BOOST Keycode', machine1.lastOutput);
    }

    part2() {
        let machine2 = new Intcode(this.memory, [2]);

        machine2.run();
        console.log('Distress Signal Coordinates', machine2.lastOutput);
    }
}