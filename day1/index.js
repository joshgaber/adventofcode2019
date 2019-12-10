const fs = require('fs');

const calculateFuel = function(data) {
    return Math.max(0, Math.floor(parseInt(data) / 3) - 2);
};

const calculateWeightOfFuel = function(data) {
    let fuel = calculateFuel(data);
    return Math.max(0, fuel) + (fuel > 0 ? calculateWeightOfFuel(fuel) : 0);
};

fs.readFile('./input.txt', {encoding: 'utf-8'}, (err, data) => {
    const modules = data.split(/\r?\n/g);

    let transformed = modules.map(calculateFuel);
    let total = transformed.reduce((a, b) => a + b, 0);
    console.log('Total weight of fuel needed (base):', total);

    transformed = modules.map(calculateWeightOfFuel);
    total = transformed.reduce((a, b) => a + b, 0);
    console.log('Total weight of fuel needed (withAddedFuel):', total);
});
