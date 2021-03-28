export default class Day1 {
    constructor(data) {
        this.modules = data.split(/\r?\n/g);
    }

    part1() {
        let transformed = this.modules.map(this.calculateFuel.bind(this));
        let total = transformed.reduce((a, b) => a + b, 0);
        console.log('Total weight of fuel needed (base):', total);
    }

    part2() {
        const transformed = this.modules.map(this.calculateWeightOfFuel.bind(this));
        const total = transformed.reduce((a, b) => a + b, 0);
        console.log('Total weight of fuel needed (with added fuel):', total);
    }

    calculateFuel(data) {
        return Math.max(0, Math.floor(parseInt(data) / 3) - 2);
    }

    calculateWeightOfFuel(data) {
        let fuel = this.calculateFuel(data);
        return Math.max(0, fuel) + (fuel > 0 ? this.calculateWeightOfFuel(fuel) : 0);
    }
}
