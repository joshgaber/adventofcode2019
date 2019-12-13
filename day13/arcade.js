module.exports = class {

    tiles = [];

    constructor(painted = []) {
        this.painted = painted;
    }

    build(inputs = []) {
        let a = 0;
        while(a < inputs.length) {
            let newTile = {};
            newTile.x = inputs[a++];
            newTile.y = inputs[a++];
            newTile.id = inputs[a++];
            this.tiles.push(newTile);
        }
    }
};
