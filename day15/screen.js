import tkit from 'terminal-kit'
import wait from '../utilities/wait.js'

export default class Screen {

    term = tkit.terminal;
    chars = {
        0: {char: '\u2588', color: 'gray'},
        1: {char: ' ', color: 'black'},
        2: {char: '\u2605', color: 'yellow'},
        3: {char: '\u2248', color: 'cyan'},
        4: {char: '\u25cf', color: 'green'},
    };

    constructor(map) {
        this.map = map;
        this.width = this.map.reduce((a, b) => Math.max(a, b.x), 0) - this.map.reduce((a, b) => Math.min(a, b.x), 0) + 3;
        this.height = this.map.reduce((a, b) => Math.max(a, b.y), 0) - this.map.reduce((a, b) => Math.min(a, b.y), 0) + 3;
        this.minX = this.map.reduce((a, b) => Math.min(a, b.x), 0) - 1;
        this.minY = this.map.reduce((a, b) => Math.min(a, b.y), 0) - 1;
        this.depth = this.map.reduce((a, b) => Math.max(a, b.depth), 0);

        this.term.fullscreen(1);
        this.buffer = new tkit.ScreenBuffer({
            height: this.height,
            dst: this.term
        });
        this.buffer.fill({region: {x: 0, y: 0, width: this.width, height: this.height}, char: this.chars[0].char, attr: {color: this.chars[0].color}});
        this.buffer.draw();
    }

    updateInput(map, depth) {
        map.forEach(t => {
            this.buffer.put({
                x: t.x - this.minX,
                y: t.y - this.minY,
                attr: {color: this.chars[t.tile].color}
            }, this.chars[t.tile].char);
        });
        this.buffer.put({
            x: this.width+2,
            y: 0,
            attr: {color: 'red'}
        }, `\u041C\u0438\u043D\u0443\u0442: ${Math.floor(depth/60).toString().padStart(2, '0')}:${(depth%60).toString().padStart(2, '0')}`);
        this.buffer.draw();
    }

    play() {
        this.map.find(m => m.depth === 0).tile = 2;
        this.updateInput(this.map, 0);
        for(let i = 1; i<=this.depth; i++) {
            wait(250);
            const next = this.map.filter(m => m.depth === i).map(m => Object.assign(m, {tile: 3}));
            this.updateInput(next, i);
        }
        wait(2000);
        this.term.processExit(0);
    }
};
