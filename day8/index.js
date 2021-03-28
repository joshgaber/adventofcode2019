export default class Day8 {
    constructor(data) {
        this.layers = data.match(/.{1,150}/g).map(x => x.split("").map(Number));
    }

    part1() {
        const fewestZeroLayer = this.layers.reduce((a, b) => this.numberCount(a, 0) < this.numberCount(b, 0) ? a : b, this.layers[0]);
        console.log(`count of ones x count of twos in fewest zero layer: `, this.numberCount(fewestZeroLayer, 1) * this.numberCount(fewestZeroLayer, 2));
    }

    part2() {
        let message = [];
        for (const i in this.layers[0]) {
            message[i] = this.layers.reduce((shown, layer) => (shown === 2 ? layer[i] : shown), 2);
        }

        for (let i = 0; i<6; i++) {
            console.log(message.slice(25*i, 24+25*i).join('')
                .replace(/0/g, ' ').replace(/1/g, '\u2588'));
        }
    }

    numberCount = (layer, digit) => layer.filter(x => x === digit).length;
}

