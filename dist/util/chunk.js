"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = chunk;
function chunk(array, chunkSize) {
    const tempArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        tempArray.push(array.slice(i, i + chunkSize));
    }
    return tempArray;
}
//# sourceMappingURL=chunk.js.map