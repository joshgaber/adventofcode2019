const fs = require('fs');
const Intcode = require('./intcode');
const phases = buildPhases();
var maxOutput = 0;

fs.readFile('./input.txt', 'utf8', function(err, data) {
    const commands = data.split(',').map(data => parseInt(data));
    let position = 0;

    for (i in phases) {
        let response1 = (new Intcode(commands, [
            phases[i][0],
            0
        ])).run().response;
        let response2 = (new Intcode(commands, [
            phases[i][1],
            response1
        ])).run().response;
        let response3 = (new Intcode(commands, [
            phases[i][2],
            response2
        ])).run().response;
        let response4 = (new Intcode(commands, [
            phases[i][3],
            response3
        ])).run().response;
        let response5 = (new Intcode(commands, [
            phases[i][4],
            response4
        ])) .run().response;

        maxOutput = Math.max(maxOutput, response5);
    }

    console.log(maxOutput);
})

function buildPhases() {
    let temp = []
    for (i = 1234; i<=43210; i++) {
        j = i.toString().padStart(5, "0").split("");
        if (j.includes("0") &&
            j.includes("1") &&
            j.includes("2") &&
            j.includes("3") &&
            j.includes("4")
        ) {
            temp.push(j.map(x => parseInt(x)));
        }
    }
    return temp;
}