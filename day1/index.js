const fs = require('fs');
const path = require('path');

const calculateFuel = function(data) {
    return Math.max(0, Math.floor(parseInt(data) / 3) - 2);
};

const calculateWeightOfFuel = function(data) {
    let fuel = calculateFuel(data);
    return Math.max(0, fuel) + (fuel > 0 ? calculateWeightOfFuel(fuel) : 0);
};

const data = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const modules = data.split(/\r?\n/g);

let transformed = modules.map(calculateFuel);
let total = transformed.reduce((a, b) => a + b, 0);
console.log('Total weight of fuel needed (base):', total);

transformed = modules.map(calculateWeightOfFuel);
total = transformed.reduce((a, b) => a + b, 0);
console.log('Total weight of fuel needed (with added fuel):', total);
