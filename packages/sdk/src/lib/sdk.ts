import { PingCollection } from "../collections/ping";
import { UsersCollection } from "../collections/users";
import { QueryClient, QueryClientConfig } from "./queryClient";
import { HostUrl } from "./common";

export class Sdk {
    ping: PingCollection;
    users: UsersCollection;

    constructor(host: HostUrl, queryClientOptions: QueryClientConfig = {}) {
        this.ping = new PingCollection(new QueryClient("/ping", host, queryClientOptions));
        this.users = new UsersCollection(new QueryClient("/users", host, queryClientOptions));
    }
}
