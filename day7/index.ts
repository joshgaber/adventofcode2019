import Intcode from '../utilities/intcode'

export default class Day7 {
  private readonly memory: number[]

  constructor(data: string) {
    this.memory = data.split(',').map(Number)
  }

  part1(): void {
    console.log(
      'Max output for phases 0-4:',
      this.runAmplifier(this.fromPhases('01234'))
    )
  }

  part2(): void {
    console.log(
      'Max output for phases 5-9:',
      this.runAmplifier(this.fromPhases('56789'))
    )
  }

  fromPhases(phaseFilter: string): number[][] {
    const phaseList = phaseFilter.split('')
    const phaseBuild = []
    for (let i = 10000; i <= 99999; i++) {
      const j = i.toString().split('')
      if (
        j.includes(phaseList[0]) &&
        j.includes(phaseList[1]) &&
        j.includes(phaseList[2]) &&
        j.includes(phaseList[3]) &&
        j.includes(phaseList[4])
      ) {
        phaseBuild.push(j.map(Number))
      }
    }
    return phaseBuild
  }

  runAmplifier(phases: number[][]): number {
    let maxOutput = 0
    for (const i in phases) {
      const amps = [
        new Intcode(this.memory, [phases[i][0], 0]),
        new Intcode(this.memory, [phases[i][1]]),
        new Intcode(this.memory, [phases[i][2]]),
        new Intcode(this.memory, [phases[i][3]]),
        new Intcode(this.memory, [phases[i][4]])
      ]

      let currentAmp = 0
      do {
        if (amps[currentAmp].run() && currentAmp === 4) {
          maxOutput = Math.max(maxOutput, amps[currentAmp].lastOutput)
          break
        } else {
          const outputs = amps[currentAmp].popOutputs()
          currentAmp = (currentAmp + 1) % 5
          amps[currentAmp].pushInputs(outputs)
        }
      } while (true)
    }

    return maxOutput
  }
}
