import Intcode from '../utilities/intcode'

export default class Day9 {
  private readonly memory: number[]
  constructor(data: string) {
    this.memory = data.split(',').map(Number)
  }

  part1(): void {
    const machine1 = new Intcode(this.memory, [1])

    machine1.run()
    console.log('BOOST Keycode', machine1.lastOutput)
  }

  part2(): void {
    const machine2 = new Intcode(this.memory, [2])

    machine2.run()
    console.log('Distress Signal Coordinates', machine2.lastOutput)
  }
}
