import { SdkInitOptions } from "./sdk";
import { QueryClient } from "./queryClient";

export class Collection {
    client: QueryClient;

    constructor(options: CollectionInitOptions) {
        this.client = new QueryClient(options);
    }
}

export interface CollectionInitOptions extends SdkInitOptions {
    collection: `/${string}`;
}
