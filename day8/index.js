const fs = require('fs')

fs.readFile('./input.txt', 'utf8', function(err, data) {
    let layers = data.match(/.{1,150}/g).map(x => x.split("").map(Number));

    let message = [];    

    for (i in layers[0]) {
        message[i] = layers.reduce((shown, layer) => (shown === 2 ? layer[i] : shown), 2);
    }

    for (let i = 0; i<6; i++) {
        console.log(message.slice(0+25*i,24+25*i).join('').replace(/0/g, ' ').replace(/1/g, '\u25A0'));
    }
})