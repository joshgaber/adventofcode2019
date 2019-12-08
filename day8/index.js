const fs = require('fs')

fs.readFile('./input.txt', 'utf8', function(err, data) {
    let layers = data.match(/.{1,150}/g);

    let lowest0 = layers.reduce((lowest, layer) => {
        let layerList = layer.split("").map(Number);
        let count0 = layerList.filter(x => x === 0).length;
        let count1 = layerList.filter(x => x === 1).length;
        let count2 = layerList.filter(x => x === 2).length;
        return (lowest.zeroes < count0 ? lowest : {zeroes: count0, '1x2': count1*count2})
    }, {'zeroes': Infinity})

    console.log(lowest0)
})