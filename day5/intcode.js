module.exports = class {

    cursor = 0;

    constructor(memory, input) {
        this.memory = memory;
        this.input = input;
    }

    run() {
        do {
            let command = this.memory[this.cursor].toString().padStart(5,"0");
            let action = parseInt(command.substr(command.length - 2));

            if (action === 99) return true;
            if (action === 1) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                this.setMemory(3, param1 + param2).advanceCursor(4);
            } else if (action === 2) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                this.setMemory(3, param1 * param2).advanceCursor(4);
            } else if (action === 3) {
                this.setMemory(1, this.input).advanceCursor(2);
            } else if (action === 4) {
                this.output = this.getMemory(1, command);
                this.advanceCursor(2);
            } else if (action === 5) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                if (param1) {
                    this.advanceCursor(param2, 0);
                } else {
                    this.advanceCursor(3);
                }
            } else if (action === 6) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                if (!param1) {
                    this.advanceCursor(param2, 0);
                } else {
                    this.advanceCursor(3);
                }
            } else if (action === 7) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                this.setMemory(3, (param1 < param2 ? 1 : 0)).advanceCursor(4);
            } else if (action === 8) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                this.setMemory(3, (param1 === param2 ? 1 : 0)).advanceCursor(4);
            }
        } while (true);
    }

    getMemory(param, command) {
        return (parseInt(command.charAt(3 - param)) ?
            this.memory[this.cursor + param] :
            this.memory[this.memory[this.cursor + param]]);
    }

    setMemory(param, value) {
        this.memory[this.memory[this.cursor + param]] = value;
        return this;
    }

    advanceCursor(offset, base = this.cursor) {
        this.cursor = offset + base;
        return this;
    }
};
