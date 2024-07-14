import { PingCollection } from "../collections/ping";

export class Sdk {
    ping: PingCollection;

    constructor(options: SdkInitOptions) {
        this.ping = new PingCollection({ ...options, collection: "/ping" });
    }
}

export interface SdkInitOptions {
    url: `${"http" | "https"}://${string}/`;
    version?: `v${number}`;
    fetchOverrides?: RequestInit;
}
