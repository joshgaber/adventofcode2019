const fs = require('fs')

const getVectorCoordinates = function(data) {
    const vectors = data.split(',');

    let points = [
        {
            x: 0,
            y: 0
        }
    ];

    for(v in vectors) {
        const direction = vectors[v].substr(0,1);
        const distance = parseInt(vectors[v].substr(1));

        for (let i = 0; i<distance; i++) {
            const lastPoint = points[points.length - 1];
            switch (direction) {
                case 'U':
                    points.push({x: lastPoint.x, y: lastPoint.y+1});
                    break;
                case 'D':
                    points.push({x: lastPoint.x, y: lastPoint.y-1});
                    break;
                case 'L':
                    points.push({x: lastPoint.x-1, y: lastPoint.y});
                    break;
                case 'R':
                    points.push({x: lastPoint.x+1, y: lastPoint.y});
                    break;
                default:
                    break;
            }
        }
    }
    return points;
}

const sortWires = function(a, b) {
    return (Math.abs(a.x) + Math.abs(a.y)) - (Math.abs(b.x) + Math.abs(b.y))
}

fs.readFile('./input.txt', 'utf-8', function(err, data) {
    const wires = data.split(/\r?\n/g).map(getVectorCoordinates);
    // wires[0].sort(sortWires);
    // console.log("first wires sorted");
    // wires[1].sort(sortWires);
    // console.log("second wires sorted");
    
    for(a in wires[0]) {
        for (b in wires[1]) {
            if (wires[0][a].x === wires[1][b].x && wires[0][a].y === wires[1][b].y) {
                steps = parseInt(a)+parseInt(b);
                console.log('x: '+wires[0][a].x, 'y: '+wires[0][a].y, 'steps: '+steps);
            }
        }
    }
})