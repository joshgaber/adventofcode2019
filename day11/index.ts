import Intcode from '../utilities/intcode'
import Painter from './painter'
import Square from "./square";

export default class Day11 {
    private readonly memory: number[];
    constructor(data: string) {
        this.memory = data.split(',').map(Number);
    }

    part1() {
        const machine = new Intcode(this.memory);
        const painter = new Painter();

        let completed = false;
        do {
            completed = machine.run();
            painter.run(machine.popOutputs());
            machine.pushInputs([painter.currentColor]);
        } while(!completed);

        let painted = painter.painted.slice();

        let grid: {[key: string]: number} = {};
        for (const p in painted) {
            grid[`${painted[p].x}x${painted[p].y}`] = painted[p].color;
        }

        console.log(`painted panels:`, Object.keys(grid).length);
    }

    part2() {
        const machine2 = new Intcode(this.memory);
        const painter2 = new Painter([{
            x: 0, y: 0, color: 1
        }]);

        let completed = false;
        do {
            completed = machine2.run();
            painter2.run(machine2.popOutputs());
            machine2.pushInputs([painter2.currentColor]);
        } while(!completed);

        this.printout(painter2.painted.slice());
    }

    printout(painted: Square[]) {
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
}
