export declare class AuthError extends Error {
    data: Record<string, unknown>;
    name: string;
    constructor(message: string, extra?: {
        stack?: string;
        data?: Record<string, unknown>;
    });
}
export declare class UnauthorizedError extends Error {
    url: string;
    data: Record<string, unknown>;
    name: string;
    constructor(url: string, extra?: {
        stack?: string;
        data?: Record<string, unknown>;
    });
}
export declare class ForbiddenError extends Error {
    url: string;
    data: Record<string, unknown>;
    name: string;
    constructor(url: string, extra?: {
        stack?: string;
        data?: Record<string, unknown>;
    });
}
export declare class NotFoundError extends Error {
    url: string;
    stack?: string;
    name: string;
    constructor(url: string, stack?: string);
}
export declare class RatelimitError extends Error {
    url: string;
    data: Record<string, unknown>;
    name: string;
    constructor(message: string, url: string, extra?: {
        stack?: string;
        data?: Record<string, unknown>;
    });
}
export declare class BadRequestError extends Error {
    url: string;
    data: Record<string, unknown>;
    name: string;
    constructor(url: string, extra?: {
        stack?: string;
        data?: Record<string, unknown>;
    });
}
export declare class RequestRetriesExceededError extends Error {
    url: string;
    readonly cause: unknown;
    constructor(message: string, url: string, cause: unknown);
}
