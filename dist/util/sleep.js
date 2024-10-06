"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
/**
 * Sleep function.
 * @param {number} delay Delay in milliseconds.
 */
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map