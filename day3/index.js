export default class Day3 {
    constructor(data) {
        const wires = data.split(/\r?\n/g);
        const coords = [
            this.getVectorCoordinates(wires[0], 'wire1'),
            this.getVectorCoordinates(wires[1], 'wire2')
        ].flat();

        let locationHash = this.convertToHashArray(coords, i => `x${i.x}y${i.y}`);
        let crossovers = {};
        for (const i in locationHash) {
            if (locationHash[i].find(j => j.id === 'wire1') && locationHash[i].find(j => j.id === 'wire2')) {
                crossovers[i] = locationHash[i];
            }
        }

        this.crossSummary = Object.keys(crossovers).map(i => ({
            x: crossovers[i][0].x,
            y: crossovers[i][0].y,
            distance: this.distance(crossovers[i][0]),
            stepTotal: crossovers[i].reduce((a, b) => a + b.step, 0)
        }));
    }

    part1() {
        this.crossSummary.sort(this.sortWiresByDistance);
        console.log('Shortest distance:', this.crossSummary[0].distance);
    }

    part2() {
        this.crossSummary.sort(this.sortWiresBySteps);
        console.log('Shortest step total:', this.crossSummary[0].stepTotal);
    }

    getVectorCoordinates(data, id) {
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
    }

    sortWiresByDistance = (a, b) => a.distance - b.distance;

    sortWiresBySteps = (a, b) => a.stepTotal - b.stepTotal;

    distance = point => Math.abs(point.x) + Math.abs(point.y);

    convertToHashArray(coords, indexer) {
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
    }
}
