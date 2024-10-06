import { HttpClient } from './http/HttpClient';
export declare abstract class Manager {
    protected readonly http: HttpClient;
    constructor(http: HttpClient);
}
