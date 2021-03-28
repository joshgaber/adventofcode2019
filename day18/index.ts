import Location from "./location";

export default class Day18 {
  private locations: {[key: string]: Location};
  private nonSpaces: Location[];
  constructor(data: string) {
    const chars = data.split('\n').map(line => line.split(''));
    this.locations = {};

    for (const i in chars) {
      for (const j in chars[i]) {
        if (chars[i][j] !== '#') {
          const here: Location = {
            char: chars[i][j],
            neighbors: [],
          };
          this.locations[`${i}x${j}`] = here
          const left = `${parseInt(i) - 1}x${j}`;
          if (this.locations.hasOwnProperty(left)) {
            here.neighbors.push(this.locations[left]);
            this.locations[left].neighbors.push(here);
          }
          const up = i + 'x' + (parseInt(j) - 1);
          if (this.locations.hasOwnProperty(up)) {
            here.neighbors.push(this.locations[up]);
            this.locations[up].neighbors.push(here);
          }
        }
      }
    }

    this.nonSpaces = Object.keys(this.locations)
        .filter(l => this.locations[l].char !== '.')
        .map(l => this.locations[l]);
  }
  
  part1() {
    const me = this.nonSpaces.find(l => l.char === '@');
    const keys = this.nonSpaces.filter(l => l.char.match(/^[a-z]$/));

    console.log(keys);
  }
  
  part2() {
    
  }
}
