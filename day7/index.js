const fs = require('fs');
const Intcode = require('./intcode');
const phases = buildPhases();
var maxOutput = 0;

fs.readFile('./input.txt', 'utf8', function(err, data) {
    const commands = data.split(',').map(data => parseInt(data));

    for (i in phases) {
        let amps = [
            new Intcode(commands.slice(), [phases[i][0], 0 ]),
            new Intcode(commands.slice(), [phases[i][1]]),
            new Intcode(commands.slice(), [phases[i][2]]),
            new Intcode(commands.slice(), [phases[i][3]]),
            new Intcode(commands.slice(), [phases[i][4]]),
        ];

        let currentAmp = 0;
        do {
            // console.log('Running amp', currentAmp);
            if(amps[currentAmp].run() && currentAmp === 4) {
                console.log('break at amp', currentAmp, amps[currentAmp].lastOutput);
                maxOutput = Math.max(maxOutput, amps[currentAmp].lastOutput);
                break;
            } else {
                let outputs = amps[currentAmp].popOutputs();
                let currentState = amps[currentAmp].commands;
                currentAmp = (currentAmp+1) % 5;
                amps[currentAmp].pushInputs(outputs);
                amps[currentAmp].setCommands(currentState.slice());
            }
        } while (true)
    }

    console.log('Max output', maxOutput);
})

function buildPhases() {
    let temp = []
    for (i = 56789; i<=98765; i++) {
        j = i.toString().split("");
        if (j.includes("5") &&
            j.includes("6") &&
            j.includes("7") &&
            j.includes("8") &&
            j.includes("9")
        ) {
            temp.push(j.map(Number));
        }
    }
    return temp;
}