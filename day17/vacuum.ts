import Position from './position'

export default class Vacuum {
  position = {
    x: 0,
    y: 0
  }
  coords: { [key: string]: Position } = {}

  hashPosition = (position = this.position): string =>
    `${position.x}x${position.y}`

  build(inputs: number[]): this {
    inputs.forEach((i) => {
      switch (i) {
        case 46:
        case 35:
          this.addCoord(i).stepForward()
          break
        case 10:
          this.newLine()
          break
        default:
          break
      }
    })
    return this
  }

  addCoord(id: number, position = this.position): this {
    this.coords[this.hashPosition(position)] = {
      x: position.x,
      y: position.y,
      id: id
    }
    return this
  }

  stepForward(): this {
    this.position.x++
    return this
  }

  newLine(): this {
    this.position.x = 0
    this.position.y++
    return this
  }

  get scaffolds(): string[] {
    return Object.keys(this.coords).filter((x) => this.coords[x].id === 35)
  }

  get intersections(): string[] {
    const scaffolds = this.scaffolds
    return scaffolds.filter(
      (c) =>
        scaffolds.includes(
          this.hashPosition({ x: this.coords[c].x, y: this.coords[c].y - 1 })
        ) &&
        scaffolds.includes(
          this.hashPosition({ x: this.coords[c].x, y: this.coords[c].y + 1 })
        ) &&
        scaffolds.includes(
          this.hashPosition({ x: this.coords[c].x - 1, y: this.coords[c].y })
        ) &&
        scaffolds.includes(
          this.hashPosition({ x: this.coords[c].x + 1, y: this.coords[c].y })
        )
    )
  }

  get sumOfIntersections(): number {
    return this.intersections.reduce((a, b) => {
      const [i, j] = b.split('x').map(Number)
      return a + i * j
    }, 0)
  }
}
