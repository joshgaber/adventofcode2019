const fs = require('fs');
const Intcode = require('./intcode');
const goal = 19690720;

fs.readFile('./input.txt', 'utf8', function(err, data) {
    const memory = data.split(',').map(Number);

    const test = new Intcode(memory.slice(), 12, 2);
    test.run();

    console.log('Gravity assist reset code:', test.output);

    for(let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const test = new Intcode(memory.slice(), i, j);
            test.run();

            if (test.output === goal) {
                console.log(`noun=${i} verb=${j}; input:`, i * 100 + j);
            }
        }
    }
});
