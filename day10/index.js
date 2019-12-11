const fs = require('fs');
const path = require('path');
const gcd = require('compute-gcd');

data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const grid = data.split(/\r?\n/g).map(x => x.split(''));
let asteroids = [];

for (const i in grid) {
    for (const j in grid[i]) {
        if (grid[i][j] === "#") {
            asteroids.push({
                x: parseInt(j),
                y: parseInt(i),
                visible: [],
            });
        }
    }
}

for (const a in asteroids) {
    for (const b in asteroids) {
        if (a === b) continue;
        let xdiff = (asteroids[b].x - asteroids[a].x);
        let ydiff = (asteroids[b].y - asteroids[a].y);
        let distance = Math.abs(asteroids[a].x - asteroids[b].x) + (asteroids[a].y - asteroids[b].y);
        let xy_gcd = gcd(Math.abs(xdiff), Math.abs(ydiff));
        xdiff /= xy_gcd;
        ydiff /= xy_gcd;
        let angle = Math.atan(ydiff / xdiff)
            + (xdiff < 0 ? Math.PI : 0);

        let currentRelative = asteroids[a].visible.find(ast => ast.xdiff === xdiff && ast.ydiff === ydiff);

        if (!currentRelative) {
            asteroids[a].visible.push({
                x: asteroids[b].x,
                y: asteroids[b].y,
                xdiff: xdiff,
                ydiff: ydiff,
                angle: angle,
                distance: distance
            });
        } else if (distance < currentRelative.distance) {
            currentRelative.distance = distance;
            currentRelative.x = asteroids[b].x;
            currentRelative.y = asteroids[b].y;
        }
    }
}
asteroids.sort((a, b) => b.visible.length - a.visible.length);
const base = asteroids.shift();

console.log(`Number of visible asteroids from optimal base:`, base.visible.length);

base.visible.sort((a, b) => a.angle - b.angle);

console.log(`200th asteroid destroyed:`, base.visible[199].x * 100 + base.visible[199].y);