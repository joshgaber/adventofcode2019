import * as tkit from 'terminal-kit'
import Pixel from './pixel'
import Tile from './tile'

export default class Screen {
  term = tkit.terminal()
  readonly chars: { [key: number]: Pixel } = {
    0: { char: ' ', color: 0 },
    1: { char: '\u2588', color: 8 },
    2: { char: '\u2b1a', color: 11 },
    3: { char: '\u2015', color: 9 },
    4: { char: '\u25cf', color: 14 }
  }
  private buffer: tkit.ScreenBuffer

  constructor(height: number, private width: number) {
    this.term.fullscreen(true)
    this.buffer = new tkit.ScreenBuffer({
      height: height,
      dst: this.term
    })
    this.buffer.draw()
  }

  updateInput(tiles: { [key: string]: Tile }, score: number): void {
    Object.keys(tiles).forEach((t) => {
      this.buffer.put(
        {
          x: tiles[t].x,
          y: tiles[t].y,
          attr: { color: this.chars[tiles[t].id].color },
          wrap: false,
          dx: 1,
          dy: 0
        },
        this.chars[tiles[t].id].char
      )
    })
    this.buffer.put(
      {
        x: this.width + 2,
        y: 0,
        attr: { color: 14 },
        wrap: false,
        dx: 1,
        dy: 0
      },
      `\u041E\u0442\u043C\u0435\u0442\u043A\u0430: ${score}`
    )
    this.buffer.draw()
  }

  close(): void {
    this.term.fullscreen(false)
    this.term.processExit(0)
  }
}
