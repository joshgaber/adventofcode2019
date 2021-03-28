export default class Day4 {
    constructor(data) {
        const [first, last] = data.split('-')
        const range = [...Array(last - first + 1).keys()].map(i => i + first).map(this.intToNumberArray);

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

    alwaysIncreases(number) {
        for (let x = 0; x < 5; x++) {
            if (number[x] > number[x+1]) {
                return false;
            }
        }
        return true;
    };

    hasDuplicate = function(number) {
        for (let x = 0; x < 5; x++) {
            if (number[x] === number[x+1]) {
                return true;
            }
        }
        return false;
    };

    hasDuplicateButNotTriplicate(number) {
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

    intToNumberArray = (i) => i.toString().split("").map(Number);
}

// const alwaysIncreases = function(number) {
//     for (let x = 0; x < 5; x++) {
//         if (number[x] > number[x+1]) {
//             return false;
//         }
//     }
//     return true;
// };
//
// const hasDuplicate = function(number) {
//     for (let x = 0; x < 5; x++) {
//         if (number[x] === number[x+1]) {
//             return true;
//         }
//     }
//     return false;
// };
//
// const hasDuplicateButNotTriplicate = function(number) {
//     for (let x = 0; x < 5; x++) {
//         if (number[x] === number[x+1]) {
//             if (x < 4 && number[x] === number[x+2]) {
//                 do {
//                     x++;
//                 } while (x < 5 && number[x] === number[x+2])
//             } else {
//                 return true;
//             }
//         }
//     }
//     return false;
// };
//
// const intToNumberArray = (i) => i.toString().split("").map(Number);
//
// const range = [...Array(last - first + 1).keys()].map(i => i + first).map(intToNumberArray);
//
// const increaseOnly = range.filter(alwaysIncreases);
//
// const part1 = increaseOnly.filter(hasDuplicate);
// console.log(`part 1 count:`,part1.length);
//
// const part2 = increaseOnly.filter(hasDuplicateButNotTriplicate);
// console.log(`part 1 count:`,part2.length);