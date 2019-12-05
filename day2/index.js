const fs = require('fs');
const goal = 19690720;

fs.readFile('./input.txt', 'utf8', function(err, data) {
    let commands = data.split(',').map(data => parseInt(data));

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
                console.log(`noun=${i} verb=${j}`);
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
})