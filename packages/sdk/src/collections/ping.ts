import { Collection, CollectionInitOptions } from "../lib/collection";

export const pingMessages = ["Ping!", "Pong!"] as const;
export type PingMessage = (typeof pingMessages)[number];

export interface PostPingRequestBody {
    message: PingMessage;
}

export const deploymentEnvironments = ["production", "development", "test"] as const;
export type DeploymentEnvironment = (typeof deploymentEnvironments)[number];

export interface GetPingSuccessResponseData {
    environment: DeploymentEnvironment;
}

export class PingCollection extends Collection {
    constructor(options: CollectionInitOptions) {
        super(options);
    }

    async getPing() {
        return this.client.query<GetPingSuccessResponseData>();
    }

    async postPing(body: PostPingRequestBody) {
        return this.client.query<GetPingSuccessResponseData>({ method: "POST", json: body });
    }
}
