module.exports = class {

    position = 0;

    constructor(memory, input1, input2) {
        this.memory = memory;
        this.memory[1] = input1;
        this.memory[2] = input2;
    }

    run() {
        do {
            let command = this.memory[this.position];
            if (command === 99) break;
            if (command === 1) {
                this.memory[this.memory[this.position + 3]] = this.memory[this.memory[this.position + 1]] + this.memory[this.memory[this.position + 2]];
            } else if (command === 2) {
                this.memory[this.memory[this.position + 3]] = this.memory[this.memory[this.position + 1]] * this.memory[this.memory[this.position + 2]];
            }
            this.position += 4;
        } while (true);
    }

    get output() {
        return this.memory[0];
    }
};
