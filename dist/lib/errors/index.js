"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRetriesExceededError = exports.BadRequestError = exports.RatelimitError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.AuthError = void 0;
/* eslint-disable no-unused-vars */
class AuthError extends Error {
    constructor(message, extra = {}) {
        super(message);
        this.name = AuthError.name;
        if (extra.stack)
            this.stack = extra.stack;
        if (extra.data)
            this.data = extra.data;
    }
}
exports.AuthError = AuthError;
class UnauthorizedError extends Error {
    constructor(url, extra = {}) {
        super('Unauthorized');
        this.url = url;
        this.name = UnauthorizedError.name;
        if (extra.stack)
            this.stack = extra.stack;
        if (extra.data)
            this.data = extra.data;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends Error {
    constructor(url, extra = {}) {
        super('Forbidden, are you sure you have the right scopes?');
        this.url = url;
        this.name = ForbiddenError.name;
        if (extra.stack)
            this.stack = extra.stack;
        if (extra.data)
            this.data = extra.data;
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends Error {
    constructor(url, stack) {
        super('Not found');
        this.url = url;
        this.stack = stack;
        this.name = NotFoundError.name;
    }
}
exports.NotFoundError = NotFoundError;
class RatelimitError extends Error {
    constructor(message, url, extra = {}) {
        super(message);
        this.url = url;
        this.name = RatelimitError.name;
        if (extra.stack)
            this.stack = extra.stack;
    }
}
exports.RatelimitError = RatelimitError;
class BadRequestError extends Error {
    constructor(url, extra = {}) {
        super('Bad request');
        this.url = url;
        this.name = BadRequestError.name;
        if (extra.stack)
            this.stack = extra.stack;
        if (extra.data)
            this.data = extra.data;
    }
}
exports.BadRequestError = BadRequestError;
class RequestRetriesExceededError extends Error {
    constructor(message, url, cause) {
        super(message);
        this.url = url;
        this.cause = cause;
        this.name = 'RequestRetriesExceededError';
    }
}
exports.RequestRetriesExceededError = RequestRetriesExceededError;
//# sourceMappingURL=index.js.map