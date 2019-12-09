const fs = require('fs');
const Intcode = require('./intcode');

fs.readFile('./input.txt', 'utf8', function(err, data) {
    const memory = data.split(',').map(Number);
    let machine1 = new Intcode(memory, [1]);

    machine1.run();
    console.log('BOOST Keycode', machine1.lastOutput);

    let machine2 = new Intcode(memory, [2]);

    machine2.run();
    console.log('Distress Signal Coordinates', machine2.lastOutput);
})