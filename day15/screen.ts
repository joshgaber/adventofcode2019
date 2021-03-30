import * as tkit from 'terminal-kit'
import wait from '../utilities/wait'
import Position from './position'

export default class Screen {
  term = tkit.terminal
  chars: { [key: number]: { char: string; color: number } } = {
    0: { char: '\u2588', color: 8 },
    1: { char: ' ', color: 0 },
    2: { char: '\u2605', color: 11 },
    3: { char: '\u2248', color: 14 },
    4: { char: '\u25cf', color: 10 }
  }
  private width: number
  private height: number
  private minX: number
  private minY: number
  private depth: number
  private buffer: tkit.ScreenBuffer

  constructor(private readonly map: Position[]) {
    this.map = map
    this.width =
      this.map.reduce((a, b) => Math.max(a, b.x), 0) -
      this.map.reduce((a, b) => Math.min(a, b.x), 0) +
      3
    this.height =
      this.map.reduce((a, b) => Math.max(a, b.y), 0) -
      this.map.reduce((a, b) => Math.min(a, b.y), 0) +
      3
    this.minX = this.map.reduce((a, b) => Math.min(a, b.x), 0) - 1
    this.minY = this.map.reduce((a, b) => Math.min(a, b.y), 0) - 1
    this.depth = this.map.reduce((a, b) => Math.max(a, b.depth), 0)

    this.term.fullscreen(true)
    this.buffer = new tkit.ScreenBuffer({
      height: this.height,
      dst: this.term
    })
    this.buffer.fill({
      // @ts-ignore
      region: { x: 0, y: 0, width: this.width, height: this.height },
      char: this.chars[0].char,
      attr: { color: this.chars[0].color }
    })
    this.buffer.draw()
  }

  updateInput(map: Position[], depth: number): void {
    map.forEach((t) => {
      this.buffer.put(
        {
          x: t.x - this.minX,
          y: t.y - this.minY,
          attr: { color: this.chars[t.tile].color },
          wrap: false,
          dx: 1,
          dy: 0
        },
        this.chars[t.tile].char
      )
    })
    this.buffer.put(
      {
        x: this.width + 2,
        y: 0,
        attr: { color: 9 },
        wrap: false,
        dx: 1,
        dy: 0
      },
      `\u041C\u0438\u043D\u0443\u0442: ${Math.floor(depth / 60)
        .toString()
        .padStart(2, '0')}:${(depth % 60).toString().padStart(2, '0')}`
    )
    this.buffer.draw()
  }

  play(): void {
    this.map.find((m) => m.depth === 0).tile = 2
    this.updateInput(this.map, 0)
    for (let i = 1; i <= this.depth; i++) {
      wait(250)
      const next = this.map
        .filter((m) => m.depth === i)
        .map((m) => Object.assign(m, { tile: 3 }))
      this.updateInput(next, i)
    }
    wait(2000)
    this.term.processExit(0)
  }
}
