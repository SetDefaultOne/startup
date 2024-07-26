import { SdkInitOptions } from "./sdk";
import { QueryClient } from "./queryClient";

/**
 * Query collections for specific modules.
 *
 * @warn
 * Do not use this base class by itself. Extend it to create module specific collections with its own queries.
 *
 * @example
 * ```typescript
 * class PingCollection extends Collection {
 *     constructor(options: CollectionInitOptions) {
 *         super(options);
 *     }
 * }
 * ```
 */
export class Collection {
    /**
     * The query client instance dedicated to this specific collection. All requests belonging to this collection will
     * be handled by the query client.
     *
     * @warn
     * The client must not make requests outside its module's routes. If routes are shared between routes, reach for a
     * common module that can connect the two clients.
     *
     * @example
     * ```typescript
     * this.client.query<{ message: string }>()
     * ```
     */
    client: QueryClient;

    constructor(options: CollectionInitOptions) {
        this.client = new QueryClient(options);
    }
}

export interface CollectionInitOptions extends SdkInitOptions {
    /**
     * The route handler that maps to the controllers for this collection.
     *
     * @example
     * `/ping`
     */
    collection: `/${string}`;
}
