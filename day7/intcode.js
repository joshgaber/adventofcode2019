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
            let commandString = this.commands[this.position].toString().padStart(5,"0");
            let command = parseInt(commandString.substr(commandString.length - 2));
    
            if (command === 99) return true;
            if (command === 1) {
                let param1 = this.getParameter(1, commandString);
                let param2 = this.getParameter(2, commandString);
                this.commands[this.commands[this.position + 3]] = param1 + param2;
                this.position += 4
            } else if (command === 2) {
                let param1 = this.getParameter(1, commandString);
                let param2 = this.getParameter(2, commandString);
                this.commands[this.commands[this.position + 3]] = param1 * param2;
                this.position += 4;
            } else if (command === 3) {
                if (this.inputs.length === 0) {
                    return false;
                }
                this.commands[this.commands[this.position+1]] = this.inputs.shift();
                this.position+=2;
            } else if (command === 4) {
                this.outputs.push(this.getParameter(1, commandString));
                this.position+=2;
            } else if (command === 5) {
                let param1 = this.getParameter(1, commandString);
                let param2 = this.getParameter(2, commandString);
                if (param1) {
                    this.position = param2;
                } else {
                    this.position+=3;
                }
            } else if (command === 6) {
                let param1 = this.getParameter(1, commandString);
                let param2 = this.getParameter(2, commandString);
                if (!param1) {
                    this.position = param2;
                } else {
                    this.position+=3;
                }
            } else if (command === 7) {
                let param1 = this.getParameter(1, commandString);
                let param2 = this.getParameter(2, commandString);
                this.commands[this.commands[this.position + 3]] = (param1 < param2 ? 1 : 0);
                position+=4;
            } else if (command === 8) {
                let param1 = this.getParameter(1, commandString);
                let param2 = this.getParameter(2, commandString);
                this.commands[this.commands[this.position + 3]] = (param1 === param2 ? 1 : 0);
                position+=4;
            }
        } while (true);
    }

    getParameter(param, action) {
        return (parseInt(action.charAt(3 - param)) ?
            this.commands[this.position + param] :
            this.commands[this.commands[this.position + param]]);
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
}