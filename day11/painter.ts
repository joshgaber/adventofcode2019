import Square from './square'

export default class Painter {
  position = {
    x: 0,
    y: 0
  }
  direction = 'N'
  paintMode = true

  constructor(readonly painted: Square[] = []) {}

  run(inputs: number[] = []): void {
    let a = 0
    while (a < inputs.length) {
      if (this.paintMode) {
        this.paintIt(inputs[a])
      } else {
        this.changeDirection(inputs[a])
      }
      a++
      this.paintMode = !this.paintMode
    }
  }

  changeDirection(rotation: number): void {
    if (
      (this.direction === 'N' && rotation === 0) ||
      (this.direction === 'S' && rotation === 1)
    ) {
      this.direction = 'W'
      this.position.x--
    } else if (
      (this.direction === 'E' && rotation === 0) ||
      (this.direction === 'W' && rotation === 1)
    ) {
      this.direction = 'N'
      this.position.y--
    } else if (
      (this.direction === 'S' && rotation === 0) ||
      (this.direction === 'N' && rotation === 1)
    ) {
      this.direction = 'E'
      this.position.x++
    } else if (
      (this.direction === 'W' && rotation === 0) ||
      (this.direction === 'E' && rotation === 1)
    ) {
      this.direction = 'S'
      this.position.y++
    }
  }

  paintIt(color: number): void {
    this.painted.push({
      x: this.position.x,
      y: this.position.y,
      color: color
    })
  }

  get currentColor(): number {
    const painted = this.painted
      .slice()
      .reverse()
      .find((a) => a.x === this.position.x && a.y === this.position.y)
    return painted ? painted.color : 0
  }
}
