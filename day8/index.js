const fs = require('fs');
const path = require('path');

const numberCount = (layer, digit) => layer.filter(x => x === digit).length;

data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
let layers = data.match(/.{1,150}/g).map(x => x.split("").map(Number));

fewestZeroLayer = layers.reduce((a, b) => numberCount(a, 0) < numberCount(b, 0) ? a : b, layers[0]);
console.log(`count of ones x count of twos in fewest zero layer: `, numberCount(fewestZeroLayer, 1) * numberCount(fewestZeroLayer, 2));
console.log();

let message = [];
for (const i in layers[0]) {
    message[i] = layers.reduce((shown, layer) => (shown === 2 ? layer[i] : shown), 2);
}

for (let i = 0; i<6; i++) {
    console.log(message.slice(25*i, 24+25*i).join('')
        .replace(/0/g, ' ').replace(/1/g, '\u2588'));
}
