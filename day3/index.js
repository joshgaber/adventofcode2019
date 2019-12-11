const fs = require('fs');

const getVectorCoordinates = function(data, id) {
    const vectors = data.split(',');

    let points = [
        {
            x: 0,
            y: 0,
            id: id
        }
    ];

    let step = 1;
    for(const v in vectors) {
        if (vectors.hasOwnProperty(v)) {
            const direction = vectors[v].substr(0,1);
            const distance = parseInt(vectors[v].substr(1));

            for (let i = 0; i<distance; i++) {
                let lastPoint = Object.assign({}, points[points.length - 1]);
                switch (direction) {
                    case 'U':
                        lastPoint.y++;
                        break;
                    case 'D':
                        lastPoint.y--;
                        break;
                    case 'L':
                        lastPoint.x--;
                        break;
                    case 'R':
                        lastPoint.x++;
                        break;
                    default:
                        break;
                }
                lastPoint.step = step;
                points.push(lastPoint);
                step++;
            }
        }
    }
    points.shift();
    return points;
};

const sortWiresByDistance = (a, b) => a.distance - b.distance;

const sortWiresBySteps = (a, b) => a.stepTotal - b.stepTotal;

const distance = point => Math.abs(point.x) + Math.abs(point.y);

const convertToHashArray = function(coords, indexer) {
    let hash = {};
    for (const a in coords) {
        if (coords.hasOwnProperty(a)) {
            const index = indexer(coords[a]);
            if (hash.hasOwnProperty(index)) {
                hash[index].push(coords[a]);
            } else {
                hash[index] = [coords[a]];
            }
        }
    }
    return hash;
};

fs.readFile('./input.txt', 'utf-8', function(err, data) {
    const wires = data.split(/\r?\n/g);
    const coords = [
        getVectorCoordinates(wires[0], 'wire1'),
        getVectorCoordinates(wires[1], 'wire2')
    ].flat();

    let locationHash = convertToHashArray(coords, i => `x${i.x}y${i.y}`);
    let crossovers = {};
    for (const i in locationHash) {
        if (locationHash[i].find(j => j.id === 'wire1') && locationHash[i].find(j => j.id === 'wire2')) {
            crossovers[i] = locationHash[i];
        }
    }

    const crossSummary = Object.keys(crossovers).map(i => ({
        x: crossovers[i][0].x,
        y: crossovers[i][0].y,
        distance: distance(crossovers[i][0]),
        stepTotal: crossovers[i].reduce((a, b) => a + b.step, 0)
    }));

    crossSummary.sort(sortWiresByDistance);
    console.log('Shortest distance:', crossSummary[0].distance);

    crossSummary.sort(sortWiresBySteps);
    console.log('Shortest step total:', crossSummary[0].stepTotal);
});
