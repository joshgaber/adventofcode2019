const fs = require('fs');
const path = require('path');
const Intcode = require('../utilities/intcode');
const goal = 19690720;

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const memory = data.split(',').map(Number);

const test = new Intcode(memory.slice());
test.setAddress(1, 12).setAddress(2, 2).run();

console.log('Gravity assist reset code:', test.getAddress(0));

for(let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        const test = new Intcode(memory.slice());
        test.setAddress(1, i).setAddress(2, j).run();

        if (test.getAddress(0) === goal) {
            console.log(`noun=${i} verb=${j}; input:`, i * 100 + j);
        }
    }
}
