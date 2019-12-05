const first = 153517;
const last = 630395;

const alwaysIncreases = function(number) {
    for (let x = 0; x < 5; x++) {
        if (number[x] > number[x+1]) {
            return false;
        }
    }
    return true;
}

const hasDuplicateButNotTriplicate = function(number) {
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
}

let count = 0;
for (let i = first; i <= last; i++) {
    let test = i.toString().split("").map(Number);
    if (alwaysIncreases(test) && hasDuplicateButNotTriplicate(test)) {
        count++;
    }
}

console.log(count);