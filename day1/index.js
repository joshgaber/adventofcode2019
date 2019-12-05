const fs = require('fs');

const calculateFuel = function(data) {
    let fuel = Math.floor(parseInt(data) / 3) - 2;
    return Math.max(0, fuel) + (fuel > 0 ? calculateFuel(fuel) : 0);
}

fs.readFile('./input.txt', {encoding: 'utf-8'}, (err, data) => {
    
    const modules = data.split(/\r?\n/g);
    const transformed = modules.map(calculateFuel);
    total = transformed.reduce((a, b) => a + b, 0);
    console.log(total);
});
