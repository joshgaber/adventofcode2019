module.exports = class {

    position = {
        x: 0,
        y: 0,
        depth: 0,
        parent: null
    };
    tank = null;
    timesTankFound = 0;
    explored = {'0x0': this.position};
    directions = [1,4,2,3];
    currentDirectionIndex = 0;

    hashPosition = position => `${position.x}x${position.y}`;

    isExplored = position => this.explored.hasOwnProperty(this.hashPosition(position));

    get direction() {
        return this.directions[this.currentDirectionIndex];
    }

    markAsExplored(position) {
        if (this.isExplored(position)) {
            this.position = this.explored[this.hashPosition(position)];
        } else {
            this.explored[this.hashPosition(position)] = position;
            position.parent = this.position;
            this.position = position;
        }
    }

    nextPosition() {
        let position = Object.assign({}, this.position);
        position.depth++;
        switch (this.direction) {
            case 1:
                position.y++;
                break;
            case 2:
                position.y--;
                break;
            case 3:
                position.x--;
                break;
            case 4:
                position.x++;
                break;
            default:
                break;
        }
        return position;
    }

    step(input = null) {
        if (input !== null) {
            let position = this.nextPosition();
            switch (input) {
                case 0:
                    this.currentDirectionIndex = (this.currentDirectionIndex + 3) % 4;
                    break;
                case 2:
                    this.tank = position;
                    this.timesTankFound++;
                case 1:
                    this.markAsExplored(position);
                    this.currentDirectionIndex = (this.currentDirectionIndex + 1) % 4;
                default:
                    break;
            }
        }
        return this.direction;
    }

    get maxDepth() {
        return Object.keys(this.explored).reduce((a, b) => Math.max(a, this.explored[b].depth), 0);
    }
};
