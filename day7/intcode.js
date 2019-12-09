module.exports = class {

    position = 0;
    commands;
    inputs;
    outputs = [];

    constructor(commands, inputs = [] ) {
        this.commands = commands.slice();
        this.inputs = inputs.slice();
    }

    run() {
        do {
            // console.log(this.position);
            let commandString = this.commands[this.position].toString().padStart(5,"0");
            let command = parseInt(commandString.substr(commandString.length - 2));
    
            if (command === 99) return true;
            if (command === 1) {
                let param1mode = parseInt(commandString.charAt(2));
                let param2mode = parseInt(commandString.charAt(1));
                let param1 = (param1mode ? this.commands[this.position+1] : this.commands[this.commands[this.position+1]]);
                let param2 = (param2mode ? this.commands[this.position+2] : this.commands[this.commands[this.position+2]]);
                this.commands[this.commands[this.position + 3]] = param1 + param2;
                this.position += 4
            } else if (command === 2) {
                let param1mode = parseInt(commandString.charAt(2));
                let param2mode = parseInt(commandString.charAt(1));
                let param1 = (param1mode ? this.commands[this.position+1] : this.commands[this.commands[this.position+1]]);
                let param2 = (param2mode ? this.commands[this.position+2] : this.commands[this.commands[this.position+2]]);
                this.commands[this.commands[this.position + 3]] = param1 * param2;
                this.position += 4;
            } else if (command === 3) {
                if (this.inputs.length === 0) {
                    // console.log('no input');
                    return false;
                }
                const input = this.inputs.shift();
                this.commands[this.commands[this.position+1]] = input;
                // console.log('input', input);
                this.position+=2;
            } else if (command === 4) {
                let paramMode = parseInt(commandString.charAt(2));
                const output = (paramMode ? this.commands[this.position+1] : this.commands[this.commands[this.position+1]]);
                this.outputs.push(output)
                // console.log('output', output);
                this.position+=2;
            } else if (command === 5) {
                let param1mode = parseInt(commandString.charAt(2));
                let param2mode = parseInt(commandString.charAt(1));
                let param1 = (param1mode ? this.commands[this.position+1] : this.commands[this.commands[this.position+1]]);
                let param2 = (param2mode ? this.commands[this.position+2] : this.commands[this.commands[this.position+2]]);
                if (param1) {
                    this.position = param2;
                } else {
                    this.position+=3;
                }
            } else if (command === 6) {
                let param1mode = parseInt(commandString.charAt(2));
                let param2mode = parseInt(commandString.charAt(1));
                let param1 = (param1mode ? this.commands[this.position+1] : this.commands[this.commands[this.position+1]]);
                let param2 = (param2mode ? this.commands[this.position+2] : this.commands[this.commands[this.position+2]]);
                if (!param1) {
                    this.position = param2;
                } else {
                    this.position+=3;
                }
            } else if (command === 7) {
                let param1mode = parseInt(commandString.charAt(2));
                let param2mode = parseInt(commandString.charAt(1));
                let param1 = (param1mode ? this.commands[this.position+1] : this.commands[this.commands[this.position+1]]);
                let param2 = (param2mode ? this.commands[this.position+2] : this.commands[this.commands[this.position+2]]);
                this.commands[this.commands[this.position + 3]] = (param1 < param2 ? 1 : 0);
                position+=4;
            } else if (command === 8) {
                let param1mode = parseInt(commandString.charAt(2));
                let param2mode = parseInt(commandString.charAt(1));
                let param1 = (param1mode ? this.commands[this.position+1] : this.commands[this.commands[this.position+1]]);
                let param2 = (param2mode ? this.commands[this.position+2] : this.commands[this.commands[this.position+2]]);
                this.commands[this.commands[this.position + 3]] = (param1 === param2 ? 1 : 0);
                position+=4;
            }
        } while (true);
    }

    pushInputs(input) {
        // console.log('adding inputs', input);
        this.inputs.push(...input);
        // console.log('new inputs', this.inputs);
        return this;
    }

    popOutputs() {
        let out = this.outputs.slice();
        this.outputs = [];
        // console.log('outputs', out);
        return out;
    }

    setCommands(commands) {
        this.commands = commands;
    }

    get lastOutput() {
        return this.outputs[this.outputs.length - 1];
    }
}