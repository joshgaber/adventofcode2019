const fs = require('fs');
const goal = 19690720;

fs.readFile('./input.txt', 'utf8', function(err, data) {
    let commands = data.split(',').map(data => parseInt(data));
    let position = 0;

    do {
        let commandString = commands[position].toString().padStart(5,"0");
        console.log(commandString);
        let command = parseInt(commandString.substr(commandString.length - 2));
        console.log('command', command);
        console.log('position', position);
        position++;

        if (command === 99) break;
        if (command === 1) {
            let param1mode = parseInt(commandString.charAt(2));
            let param2mode = parseInt(commandString.charAt(1));
            let param1 = (param1mode ? commands[position] : commands[commands[position]]);
            let param2 = (param2mode ? commands[position+1] : commands[commands[position+1]]);
            commands[commands[position + 2]] = param1 + param2;
            position += 3
        } else if (command === 2) {
            let param1mode = parseInt(commandString.charAt(2));
            let param2mode = parseInt(commandString.charAt(1));
            let param1 = (param1mode ? commands[position] : commands[commands[position]]);
            let param2 = (param2mode ? commands[position+1] : commands[commands[position+1]]);
            commands[commands[position + 2]] = param1 * param2;
            position += 3;
        } else if (command === 3) {
            let input = 5;
            commands[commands[position]] = input;
            console.log(`position ${commands[position]}=${input}`)
            position++;
        } else if (command === 4) {
            let paramMode = parseInt(commandString.charAt(2));
            console.log(paramMode ? commands[position] : commands[commands[position]])
            position++;
        } else if (command === 5) {
            let param1mode = parseInt(commandString.charAt(2));
            let param2mode = parseInt(commandString.charAt(1));
            let param1 = (param1mode ? commands[position] : commands[commands[position]]);
            let param2 = (param2mode ? commands[position+1] : commands[commands[position+1]]);
            console.log('param1', param1)
            if (param1) {
                position = param2;
            } else {
                position+=2;
            }
        } else if (command === 6) {
            let param1mode = parseInt(commandString.charAt(2));
            let param2mode = parseInt(commandString.charAt(1));
            let param1 = (param1mode ? commands[position] : commands[commands[position]]);
            let param2 = (param2mode ? commands[position+1] : commands[commands[position+1]]);
            if (!param1) {
                position = param2;
            } else {
                position+=2;
            }
        } else if (command === 7) {
            let param1mode = parseInt(commandString.charAt(2));
            let param2mode = parseInt(commandString.charAt(1));
            let param1 = (param1mode ? commands[position] : commands[commands[position]]);
            let param2 = (param2mode ? commands[position+1] : commands[commands[position+1]]);
            commands[commands[position + 2]] = (param1 < param2 ? 1 : 0);
            position+=3;
        } else if (command === 8) {
            let param1mode = parseInt(commandString.charAt(2));
            let param2mode = parseInt(commandString.charAt(1));
            let param1 = (param1mode ? commands[position] : commands[commands[position]]);
            let param2 = (param2mode ? commands[position+1] : commands[commands[position+1]]);
            commands[commands[position + 2]] = (param1 === param2 ? 1 : 0);
            position+=3;
        }

        console.log('position 238 value', commands[238]);
    } while (true);
})