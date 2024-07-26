import { PingCollection } from "../collections/ping";
import { UsersCollection } from "../collections/users";

/**
 * Primary SDK initialization class. Holds collections that provides wrappers that directly map to various modules in
 * the backend. The SDK client should be initialized only once and that instance should be shared across all uses.
 *
 * @param options { SdkInitOptions } Initialization options for the SDK client.
 *
 * @example
 * ```typescript
 * const sdk = new Sdk({
 *     url: "https://localhost:4200/",
 * });
 * ```
 */
export class Sdk {
    ping: PingCollection;
    users: UsersCollection;

    constructor(options: SdkInitOptions) {
        this.ping = new PingCollection({ ...options, collection: "/ping" });
        this.users = new UsersCollection({ ...options, collection: "/users" });
    }
}

export interface SdkInitOptions {
    /**
     * The host base url to connect to. This should contain the protocol, domain name and optionally the port and end
     * with a trailing `/`.
     */
    url: `${"http" | "https"}://${string}/`;
    /**
     * The API version to use. Defaults to `v1`.
     */
    version?: `v${number}`;
    /**
     * Override default `fetch` options. Takes priority over all options set by the SDK.
     */
    fetchOverrides?: RequestInit;
}
