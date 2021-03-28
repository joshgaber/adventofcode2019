import Intcode from '../utilities/intcode.js'
import Arcade from './arcade.js'

export default class Day13 {
    constructor(data) {
        this.memory = data.split(',').map(Number);
    }

    part1() {
        const machine = new Intcode(this.memory);
        machine.run();

        const game = new Arcade();
        game.build(machine.popOutputs());
        const map = game.tiles;

        const blockCount = Object.keys(map).filter(i => map[i].id === 2).length;

        console.log(`Block count:`, blockCount);
    }

    part2() {
        const machine2 = new Intcode(this.memory);
        machine2.memory[0] = 2;
        const game2 = new Arcade();

        do {
            const finished = machine2.run();
            game2.build(machine2.popOutputs());
            if (finished) break;
            machine2.pushInputs([game2.getJoystick()]);
        } while(true);

        console.log(`Final score:`, game2.score);
    }
}
