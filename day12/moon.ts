import Position from './position'

export default class Moon {
  velocity: Position = {
    x: 0,
    y: 0,
    z: 0
  }
  position: Position

  constructor(x: number, y: number, z: number) {
    this.position = {
      x: x,
      y: y,
      z: z
    }
  }

  applyGravity(planets: Moon[]): this {
    planets.forEach(this.applyGravitySingular.bind(this))
    return this
  }

  applyGravitySingular(planet: Moon): void {
    if (this === planet) return

    const gravity: Position = {
      x: this.position.x - planet.position.x,
      y: this.position.y - planet.position.y,
      z: this.position.z - planet.position.z
    }

    if (gravity.x < 0) {
      this.velocity.x++
    } else if (gravity.x > 0) {
      this.velocity.x--
    }

    if (gravity.y < 0) {
      this.velocity.y++
    } else if (gravity.y > 0) {
      this.velocity.y--
    }

    if (gravity.z < 0) {
      this.velocity.z++
    } else if (gravity.z > 0) {
      this.velocity.z--
    }
  }

  applyVelocity(): void {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.position.z += this.velocity.z
  }

  get totalEnergy(): number {
    return (
      (Math.abs(this.position.x) +
        Math.abs(this.position.y) +
        Math.abs(this.position.z)) *
      (Math.abs(this.velocity.x) +
        Math.abs(this.velocity.y) +
        Math.abs(this.velocity.z))
    )
  }
}
