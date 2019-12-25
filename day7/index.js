const fs = require('fs');
const path = require('path');
const Intcode = require('../utilities/intcode');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const memory = data.split(',').map(Number);

console.log('Max output for phases 0-4:', runAmplifier(fromPhases("01234")));
console.log('Max output for phases 5-9:', runAmplifier(fromPhases("56789")));

function fromPhases(phaseFilter) {
    const phaseList = phaseFilter.split('');
    let phaseBuild = [];
    for (let i = 10000; i<=99999; i++) {
        const j = i.toString().split("");
        if (j.includes(phaseList[0]) &&
            j.includes(phaseList[1]) &&
            j.includes(phaseList[2]) &&
            j.includes(phaseList[3]) &&
            j.includes(phaseList[4])
        ) {
            phaseBuild.push(j.map(Number));
        }
    }
    return phaseBuild;
}

function runAmplifier(phases) {
    let maxOutput = 0;
    for (const i in phases) {
        let amps = [
            new Intcode(memory.slice(), [phases[i][0], 0 ]),
            new Intcode(memory.slice(), [phases[i][1]]),
            new Intcode(memory.slice(), [phases[i][2]]),
            new Intcode(memory.slice(), [phases[i][3]]),
            new Intcode(memory.slice(), [phases[i][4]]),
        ];

        let currentAmp = 0;
        do {
            if(amps[currentAmp].run() && currentAmp === 4) {
                maxOutput = Math.max(maxOutput, amps[currentAmp].lastOutput);
                break;
            } else {
                let outputs = amps[currentAmp].popOutputs();
                currentAmp = (currentAmp+1) % 5;
                amps[currentAmp].pushInputs(outputs);
            }
        } while (true)
    }

    return maxOutput;
}