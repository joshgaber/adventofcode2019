const fs = require('fs');
const goal = 19690720;

fs.readFile('./input.txt', 'utf8', function(err, data) {
    const commands = data.split(',').map(Number);

    let newCommands = commands.slice();
    newCommands[1] = 12;
    newCommands[2] = 2;
    let position = 0;

    do {
        let command = newCommands[position];
        if (command === 99) break;
        if (command === 1) {
            newCommands[newCommands[position + 3]] = newCommands[newCommands[position + 1]] + newCommands[newCommands[position + 2]];
        } else if (command === 2) {
            newCommands[newCommands[position + 3]] = newCommands[newCommands[position + 1]] * newCommands[newCommands[position + 2]];
        }
        position += 4;
    } while (true);

    console.log('Gravity assist reset code:', newCommands[0]);

    for(let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            let newCommands = commands.slice();
            newCommands[1] = i;
            newCommands[2] = j;
            let position = 0;

            do {
                let command = newCommands[position];
                if (command === 99) break;
                if (command === 1) {
                    newCommands[newCommands[position + 3]] = newCommands[newCommands[position + 1]] + newCommands[newCommands[position + 2]];
                } else if (command === 2) {
                    newCommands[newCommands[position + 3]] = newCommands[newCommands[position + 1]] * newCommands[newCommands[position + 2]];
                }
                position += 4;
            } while (true);

            if (newCommands[0] === goal) {
                console.log(`noun=${i} verb=${j}; input:`, i * 100 + j);
            }
        }
    }

    // do {
    //     let command = commands[position];
    //     if (command === 99) break;
    //     if (command === 1) {
    //         commands[commands[position + 3]] = commands[commands[position + 1]] + commands[commands[position + 2]];
    //     } else if (command === 2) {
    //         commands[commands[position + 3]] = commands[commands[position + 1]] * commands[commands[position + 2]];
    //     }
    //     position += 4;
    // } while (true);

    // console.log(commands);
});
