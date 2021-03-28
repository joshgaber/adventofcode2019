import readline from 'readline'
import { readFileSync } from "fs";
import Days from './days.js'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt() {
    rl.question('Enter the day you wish to run: ', (input) => {
        const day = parseInt(input)

        if (day >= 1 && day <= 25) {
            const data = readFileSync(`./day${day}/input.txt`, 'utf8')
            const dayClass = new Days[`day${day}`](data)
            dayClass.part1()
            dayClass.part2()
            prompt()
        } else {
            rl.close()
        }
    });
}

prompt()