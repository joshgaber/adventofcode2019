module.exports = class {

    tiles = {};
    score = 0;

    constructor(painted = []) {
        this.painted = painted;
    }

    build(inputs = []) {
        let a = 0;
        while(a < inputs.length) {
            if (inputs[a] === -1 && inputs[a+1] === 0) {
                this.score = inputs[a+2];
                a+=3;
            } else {
                const newX = inputs[a++];
                const newY = inputs[a++];
                const newId = inputs[a++];
                this.tiles[`${newX}x${newY}`] = {
                    x: newX,
                    y: newY,
                    id: newId
                };
            }
        }
    }

    getJoystick() {
        const ball = this.findBall();
        const paddle = this.findPaddle();

        if (ball.x < paddle.x) {
            return -1;
        } else if (ball.x > paddle.x) {
            return 1;
        } else {
            return 0;
        }
    }

    findBall() {
        return this.tiles[Object.keys(this.tiles).find(a => this.tiles[a].id === 4)];
    }

    findPaddle() {
        return this.tiles[Object.keys(this.tiles).find(a => this.tiles[a].id === 3)];
    }
};
