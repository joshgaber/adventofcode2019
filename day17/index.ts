import Intcode from '../utilities/intcode'
import Vacuum from './vacuum'

export default class Day17 {
    private readonly memory: number[];
    constructor(data: string) {
        this.memory = data.split(',').map(Number);
    }

    part1() {
        const machine = new Intcode(this.memory);
        machine.run();

        const vacuum = new Vacuum();
        vacuum.build(machine.popOutputs());

        console.log(vacuum.intersections);
        console.log(vacuum.sumOfIntersections);
    }

    part2() {

    }
}
