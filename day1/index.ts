import Day from '../day'

export default class Day1 implements Day {
  readonly modules: number[]

  constructor(data: string) {
    this.modules = data.split(/\s+/g).map(Number)
  }

  part1(): void {
    const transformed: number[] = this.modules.map(
      this.calculateFuel.bind(this)
    )
    const total = transformed.reduce((a, b) => a + b)
    console.log('Total weight of fuel needed (base):', total)
  }

  part2(): void {
    const transformed: number[] = this.modules.map(
      this.calculateWeightOfFuel.bind(this)
    )
    const total = transformed.reduce((a, b) => a + b)
    console.log('Total weight of fuel needed (with added fuel):', total)
  }

  calculateFuel(data: number): number {
    return Math.max(0, Math.floor(data / 3) - 2)
  }

  calculateWeightOfFuel(data: number): number {
    const fuel = this.calculateFuel(data)
    return Math.max(0, fuel) + (fuel > 0 ? this.calculateWeightOfFuel(fuel) : 0)
  }
}
