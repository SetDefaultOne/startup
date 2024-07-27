import { PingCollection } from "../collections/ping";
import { UsersCollection } from "../collections/users";
import { HostUrl, QueryClient, QueryClientConfig } from "./queryClient";

export class Sdk {
    ping: PingCollection;
    users: UsersCollection;

    constructor(host: HostUrl, queryClientOptions: QueryClientConfig = {}) {
        this.ping = new PingCollection(new QueryClient("/ping", host, queryClientOptions));
        this.users = new UsersCollection(new QueryClient("/users", host, queryClientOptions));
    }
}
