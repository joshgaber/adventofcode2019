export default class Day4 {
    private readonly increaseOnly: number[][];
    constructor(data: string) {
        const [first, last] = data.split('-').map(Number)
        const range = Array.from(Array(1 - first + last).keys()).map(i => i + first).map(this.intToNumberArray);

        this.increaseOnly = range.filter(this.alwaysIncreases);
    }

    part1() {
        const part1 = this.increaseOnly.filter(this.hasDuplicate);
        console.log(`part 1 count:`,part1.length);
    }

    part2() {
        const part2 = this.increaseOnly.filter(this.hasDuplicateButNotTriplicate);
        console.log(`part 2 count:`,part2.length);
    }

    alwaysIncreases(number: number[]) {
        for (let x = 0; x < 5; x++) {
            if (number[x] > number[x+1]) {
                return false;
            }
        }
        return true;
    };

    hasDuplicate = function(number: number[]) {
        for (let x = 0; x < 5; x++) {
            if (number[x] === number[x+1]) {
                return true;
            }
        }
        return false;
    };

    hasDuplicateButNotTriplicate(number: number[]) {
        for (let x = 0; x < 5; x++) {
            if (number[x] === number[x+1]) {
                if (x < 4 && number[x] === number[x+2]) {
                    do {
                        x++;
                    } while (x < 5 && number[x] === number[x+2])
                } else {
                    return true;
                }
            }
        }
        return false;
    };

    intToNumberArray = (i: number): number[] => i.toString().split("").map(Number);
}
