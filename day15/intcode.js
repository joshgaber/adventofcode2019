module.exports = class {

    cursor = 0;
    outputs = [];
    relativeBase = 0;

    constructor(commands, inputs = [] ) {
        this.memory = commands.slice();
        this.inputs = inputs.slice();
    }

    run() {
        do {
            let command = this.memory[this.cursor].toString().padStart(5,"0");
            let action = parseInt(command.substr(command.length - 2));

            if (action === 99) return true;
            if (action === 1) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                this.setMemory(3, command, param1 + param2).advanceCursor(4);
            } else if (action === 2) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                this.setMemory(3, command, param1 * param2).advanceCursor(4);
            } else if (action === 3) {
                if (this.inputs.length === 0) {
                    return false;
                }
                this.setMemory(1, command, this.inputs.shift()).advanceCursor(2);
            } else if (action === 4) {
                this.outputs.push(this.getMemory(1, command));
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
                this.setMemory(3, command, (param1 < param2 ? 1 : 0)).advanceCursor(4);
            } else if (action === 8) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                this.setMemory(3, command, (param1 === param2 ? 1 : 0)).advanceCursor(4);
            } else if (action === 9) {
                let param1 = this.getMemory(1, command);
                this.relativeBase += param1;
                this.advanceCursor(2);
            }
        } while (true);
    }

    getMemory(param, action) {
        let paramMode = parseInt(action.charAt(3 - param));
        if (paramMode === 0) {
            return this.memory[this.memory[this.cursor + param]];
        } else if (paramMode === 1) {
            return this.memory[this.cursor + param];
        } else if (paramMode === 2) {
            return this.memory[this.memory[this.cursor + param] + this.relativeBase]; 
        }
    }

    setMemory(param, action, value) {
        let paramMode = parseInt(action.charAt(3 - param));
        if (paramMode === 0) {
            this.memory[this.memory[this.cursor + param]] = value;
        } else if (paramMode === 2) {
            this.memory[this.memory[this.cursor + param] + this.relativeBase] = value; 
        }
        return this;
    }

    advanceCursor(offset, base = this.cursor) {
        this.cursor = offset + base;
        return this;
    }


    pushInputs(input) {
        this.inputs.push(...input);
        return this;
    }

    popOutputs() {
        let out = this.outputs.slice();
        this.outputs = [];
        return out;
    }

    get lastOutput() {
        return this.outputs[this.outputs.length - 1];
    }
};
