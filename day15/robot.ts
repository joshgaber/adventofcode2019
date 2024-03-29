import Position from './position'

export default class Robot {
  position = {
    x: 0,
    y: 0,
    depth: 0,
    tile: 1
  }
  tank?: Position = null
  timesTankFound = 0
  explored: { [key: string]: Position } = { '0x0': this.position }
  directions = [1, 4, 2, 3]
  currentDirectionIndex = 0

  hashPosition = (position: Position): string => `${position.x}x${position.y}`

  isExplored = (position: Position): boolean =>
    this.explored.hasOwnProperty(this.hashPosition(position))

  get direction(): number {
    return this.directions[this.currentDirectionIndex]
  }

  markAsExplored(position: Position): void {
    if (this.isExplored(position)) {
      this.position = this.explored[this.hashPosition(position)]
    } else {
      this.explored[this.hashPosition(position)] = position
      this.position = position
    }
  }

  nextPosition(input: number): Position {
    const position = Object.assign({}, this.position)
    position.tile = input
    position.depth++
    switch (this.direction) {
      case 1:
        position.y++
        break
      case 2:
        position.y--
        break
      case 3:
        position.x--
        break
      case 4:
        position.x++
        break
      default:
        break
    }
    return position
  }

  step(input: number = null): number {
    if (input !== null) {
      const position = this.nextPosition(input)
      switch (input) {
        case 0:
          this.currentDirectionIndex = (this.currentDirectionIndex + 3) % 4
          break
        case 2:
          this.tank = position
          this.timesTankFound++
          break
        case 1:
          this.tank = position
          this.timesTankFound++
          this.markAsExplored(position)
          this.currentDirectionIndex = (this.currentDirectionIndex + 1) % 4
          break
        default:
          break
      }
    }
    return this.direction
  }

  get maxDepth(): number {
    return Object.keys(this.explored).reduce(
      (a, b) => Math.max(a, this.explored[b].depth),
      0
    )
  }
}
