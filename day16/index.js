const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const mapped = data.split("").map(Number);
const pattern = buildPattern(mapped.length);

let message = mapped;
for (let i = 0; i < 100; i++) {
    message = pattern.map(p => (
        Math.abs(p.plus.reduce((a, b) => a + message[b], 0) - p.minus.reduce((a, b) => a + message[b], 0)) % 10
    ));
}

console.log('First 8 of initial message decoded:', parseInt(message.slice(0, 8).join('')));

// Part 2
// let message2 = Array(10000).fill(0).reduce((a, x) => a.concat(mapped), []);
// let pattern2 = buildPattern(message2.length);
//
// console.log(message2.length);
//
// for (let i = 0; i < 100; i++) {
//     message2 = pattern2.map(p => (
//         Math.abs(p.plus.reduce((a, b) => a + message2[b], 0) - p.minus.reduce((a, b) => a + message2[b], 0)) % 10
//     ));
//     console.log(message2.slice(0, 8).reduce((a, b) => a + b.toString(), ''));
// }
// const stringIndex = parseInt(message2.slice(0,7).join(''));


function buildPattern(length) {
    const patternList = [];
    for (let i = 0; i < length; i++) {
        const pattern = {
            plus: [],
            minus: [],
        };
        for (let j = 0; j < length; j++) {
            switch (Math.floor((j+1)/(i+1)) % 4) {
                case 1:
                    pattern.plus.push(j);
                    break;
                case 3:
                    pattern.minus.push(j);
                    break;
                default:
                    break;
            }
        }
        patternList.push(pattern);
    }
    return patternList;
}
