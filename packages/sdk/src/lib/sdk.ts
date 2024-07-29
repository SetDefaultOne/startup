import { PingCollection } from "../collections/ping";
import { UsersCollection } from "../collections/users";
import { AuthCollection } from "../collections/auth";
import { QueryClient, QueryClientConfig } from "./queryClient";
import { HostUrl } from "./common";

export class Sdk {
    ping: PingCollection;
    users: UsersCollection;
    auth: AuthCollection;

    constructor(host: HostUrl, queryClientOptions: QueryClientConfig = {}) {
        this.ping = new PingCollection(new QueryClient("/ping", host, queryClientOptions));
        this.users = new UsersCollection(new QueryClient("/users", host, queryClientOptions));
        this.auth = new AuthCollection(new QueryClient("/auth", host, queryClientOptions));
    }
}
