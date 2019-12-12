const fs = require('fs');
const path = require('path');
const lcm = require('lcm');
const Moon = require('./moon');

const extractCoord = (coords, point) =>
    parseInt(coords.match(new RegExp(point + '=-?\\d+')).shift().match(/-?\d+/).shift());

const mapMoons = data => data.split('\n').map(a =>
    new Moon(
        extractCoord(a, 'x'),
        extractCoord(a, 'y'),
        extractCoord(a, 'z')
    )
);

const hashState = (moons, coord) => moons.map(a => `p${a.position[coord]}v${a.velocity[coord]}`).reduce((a, b) => a + b, '');

const totalEnergy = moons => moons.reduce((a, b) => a + b.totalEnergy, 0);

const part1 = function(data) {
    const moons = mapMoons(data);

    for (let i=0; i<1000; i++) {
        moons.forEach(p => p.applyGravity(moons));
        moons.forEach(p => p.applyVelocity());
    }

    console.log(`Total energy:`, totalEnergy(moons));
};

const part2 = function(data) {
    const cycles = [];
    const coords = ['x','y','z'];

    for (const a in coords) {
        const moons = mapMoons(data);
        const initial = hashState(moons, coords[a]);
        let steps = 0;

        do {
            moons.forEach(p => p.applyGravity(moons));
            moons.forEach(p => p.applyVelocity());
            steps++;
        } while(hashState(moons, coords[a]) !== initial);
        cycles.push(steps);
    }
    console.log(`Total steps until reset:`, lcm(cycles[0], lcm(cycles[1], cycles[2])));
};

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
part1(data);
part2(data);

