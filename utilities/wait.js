"use strict";
exports.__esModule = true;
function default_1(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
exports["default"] = default_1;
;
//# sourceMappingURL=wait.js.map