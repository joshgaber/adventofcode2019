module.exports = class {

    position = {
        x: 0,
        y: 0
    };
    coords = {};

    hashPosition = (position = this.position) => `${position.x}x${position.y}`;

    build(inputs) {
      inputs.forEach(i => {
          switch (i) {
              case 46:
              case 35:
                  this.addCoord(i).stepForward();
                  break;
              case 10:
                  this.newLine();
                  break;
              default:
                  break;
          }
      });
      return this;
    }

    addCoord(id, position = this.position) {
        this.coords[this.hashPosition(position)] = {
            x: position.x,
            y: position.y,
            id: id
        };
        return this;
    }

    stepForward() {
        this.position.x++;
        return this;
    }

    newLine() {
        this.position.x = 0;
        this.position.y++;
        return this;
    }

    findIntersections() {
        scaffolds;
    }

    get scaffolds() {
        return Object.keys(this.coords).filter(x => this.coords[x].id === 35);
    }

    get intersections() {
        const scaffolds = this.scaffolds;
        return scaffolds.filter(c =>
            scaffolds.includes(this.hashPosition({x: this.coords[c].x, y: this.coords[c].y-1})) &&
            scaffolds.includes(this.hashPosition({x: this.coords[c].x, y: this.coords[c].y+1})) &&
            scaffolds.includes(this.hashPosition({x: this.coords[c].x-1, y: this.coords[c].y})) &&
            scaffolds.includes(this.hashPosition({x: this.coords[c].x+1, y: this.coords[c].y}))
        )
    }

    get sumOfIntersections() {
        return this.intersections.reduce((a, b) => {
            const [i, j] = b.split('x').map(Number);
            return a + i * j;
        }, 0);
    }
};