const tkit = require('terminal-kit');

module.exports = class {

    term = tkit.terminal();
    chars = {
        0: {char: ' ', color: 'black'},
        1: {char: '\u2588', color: 'gray'},
        2: {char: '\u2b1a', color: 'yellow'},
        3: {char: '\u2015', color: 'red'},
        4: {char: '\u25cf', color: 'green'},
    };

    constructor(height, width) {
        this.term.fullscreen(1);
        this.buffer = new tkit.ScreenBuffer({
            height: height,
            dst: this.term
        });
        this.buffer.draw();
        this.width = width;
    }

    updateInput(tiles, score) {
        Object.keys(tiles).forEach(t => {
            this.buffer.put({
                x: tiles[t].x,
                y: tiles[t].y,
                attr: {color: this.chars[tiles[t].id].color}
            }, this.chars[tiles[t].id].char);
        });
        this.buffer.put({
            x: this.width+2,
            y: 0,
            attr: {color: 'cyan'}
        }, `\u041E\u0442\u043C\u0435\u0442\u043A\u0430: ${score}`);
        this.buffer.draw();
    }

    close() {
      this.term.fullscreen(false);
      this.term.processExit(0);
    }
};
