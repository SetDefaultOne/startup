import { PingCollection } from "../collections/ping";
import { UsersCollection } from "../collections/users";

export class Sdk {
    ping: PingCollection;
    users: UsersCollection;

    constructor(options: SdkInitOptions) {
        this.ping = new PingCollection({ ...options, collection: "/ping" });
        this.users = new UsersCollection({ ...options, collection: "/users" });
    }
}

export interface SdkInitOptions {
    url: `${"http" | "https"}://${string}/`;
    version?: `v${number}`;
    fetchOverrides?: RequestInit;
}
