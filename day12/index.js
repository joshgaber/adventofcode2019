import lcm from 'lcm'
import Moon from './moon.js'

export default class Day12 {
    constructor(data) {
        this.data = data
    }

    part1() {
        const moons = this.mapMoons(this.data);

        for (let i=0; i<1000; i++) {
            moons.forEach(p => p.applyGravity(moons));
            moons.forEach(p => p.applyVelocity());
        }

        console.log(`Total energy:`, this.totalEnergy(moons));
    }

    part2() {
        const cycles = [];
        const coords = ['x','y','z'];

        for (const a in coords) {
            const moons = this.mapMoons(this.data);
            const initial = this.hashState(moons, coords[a]);
            let steps = 0;

            do {
                moons.forEach(p => p.applyGravity(moons));
                moons.forEach(p => p.applyVelocity());
                steps++;
            } while(this.hashState(moons, coords[a]) !== initial);
            cycles.push(steps);
        }
        console.log(`Total steps until reset:`, lcm(cycles[0], lcm(cycles[1], cycles[2])));
    }

    extractCoord = (coords, point) =>
        parseInt(coords.match(new RegExp(point + '=-?\\d+')).shift().match(/-?\d+/).shift());

    mapMoons = data => data.split('\n').map(a =>
        new Moon(
            this.extractCoord(a, 'x'),
            this.extractCoord(a, 'y'),
            this.extractCoord(a, 'z')
        )
    );

    hashState = (moons, coord) => moons.map(a => `p${a.position[coord]}v${a.velocity[coord]}`).reduce((a, b) => a + b, '');

    totalEnergy = moons => moons.reduce((a, b) => a + b.totalEnergy, 0);
}
