import Intcode from '../utilities/intcode'
const goal = 19690720

export default class Day2 {
  private readonly memory: number[]

  constructor(data: string) {
    this.memory = data.split(',').map(Number)
  }

  part1(): void {
    const test = new Intcode([...this.memory])
    test.setAddress(1, 12).setAddress(2, 2).run()

    console.log('Gravity assist reset code:', test.getAddress(0))
  }

  part2(): void {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const test = new Intcode([...this.memory])
        test.setAddress(1, i).setAddress(2, j).run()

        if (test.getAddress(0) === goal) {
          console.log(`noun=${i} verb=${j}; input:`, i * 100 + j)
        }
      }
    }
  }
}
