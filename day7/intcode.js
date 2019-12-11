module.exports = class {

    cursor = 0;
    outputs = [];

    constructor(commands, inputs = [] ) {
        this.memory = commands;
        this.inputs = inputs;
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
                if (this.inputs.length === 0) {
                    return false;
                }
                this.setMemory(1, this.inputs.shift()).advanceCursor(2);
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
                this.setMemory(3, (param1 < param2 ? 1 : 0)).advanceCursor(4);
            } else if (action === 8) {
                let param1 = this.getMemory(1, command);
                let param2 = this.getMemory(2, command);
                this.setMemory(3, (param1 === param2 ? 1 : 0)).advanceCursor(4);
            }
        } while (true);
    }

    getMemory(param, action) {
        return (parseInt(action.charAt(3 - param)) ?
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
