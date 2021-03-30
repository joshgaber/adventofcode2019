import { readFileSync } from 'fs'
import Intcode from '../utilities/intcode'
import Arcade from './arcade'
import Screen from './screen'
import wait from '../utilities/wait'

const data = readFileSync('./day13/input.txt', 'utf8')
const memory = data.split(',').map(Number)

const machine = new Intcode(memory.slice())
machine.memory[0] = 2
const game = new Arcade()

const term = new Screen(23, 35)

do {
  const finished = machine.run()
  game.build(machine.popOutputs())
  if (finished) break
  machine.pushInputs([game.getJoystick()])
  term.updateInput(game.tiles, game.score)
  wait(50)
} while (true)

term.close()
