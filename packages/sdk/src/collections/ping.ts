import { QueryClient, QueryOptions } from "../lib/queryClient";

export const pingMessages = ["Ping!", "Pong!"] as const;
export type PingMessage = (typeof pingMessages)[number];

export interface PostPingRequestBody {
    message: PingMessage;
}

export const deploymentEnvironments = ["production", "development", "test"] as const;
export type DeploymentEnvironment = (typeof deploymentEnvironments)[number];

export interface GetPingSuccessResponseData {
    health: "OK!" | "FAIL!" | "ERROR!";
    environment: DeploymentEnvironment;
}

export class PingCollection {
    constructor(private readonly client: QueryClient) {}

    async getPing(options: QueryOptions = {}) {
        return this.client.query<GetPingSuccessResponseData>("/", options);
    }

    async postPing(body: PostPingRequestBody, options: QueryOptions = {}) {
        return this.client.query<GetPingSuccessResponseData>("/", { method: "POST", json: body, ...options });
    }
}
