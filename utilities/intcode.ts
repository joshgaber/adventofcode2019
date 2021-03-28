export default class Intcode {

    cursor = 0;
    outputs: number[] = [];
    relativeBase = 0;
    readonly memory: number[];
    private inputs: number[];

    constructor(commands: number[], inputs: number[] = [] ) {
        this.memory = commands.slice();
        this.inputs = inputs.slice();
    }

    run(): boolean {
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

    getMemory(param: number, action: string) {
        let paramMode = parseInt(action.charAt(3 - param));
        if (paramMode === 0) {
            return this.memory[this.memory[this.cursor + param]];
        } else if (paramMode === 1) {
            return this.memory[this.cursor + param];
        } else if (paramMode === 2) {
            return this.memory[this.memory[this.cursor + param] + this.relativeBase]; 
        }
    }

    setMemory(param: number, action: string, value: number) {
        let paramMode = parseInt(action.charAt(3 - param));
        if (paramMode === 0) {
            this.memory[this.memory[this.cursor + param]] = value;
        } else if (paramMode === 2) {
            this.memory[this.memory[this.cursor + param] + this.relativeBase] = value;
        }
        return this;
    }

    setAddress(address: number, value: number) {
        this.memory[address] = value;
        return this;
    }

    getAddress(address: number) {
        return this.memory[address];
    }

    advanceCursor(offset: number, base = this.cursor) {
        this.cursor = offset + base;
        return this;
    }


    pushInputs(input: number[]) {
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
}
