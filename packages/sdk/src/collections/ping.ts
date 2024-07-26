import { Collection, CollectionInitOptions } from "../lib/collection";

/**
 * Possible ping messages.
 */
export const pingMessages = ["Ping!", "Pong!"] as const;
/**
 * Ping messages union type.
 */
export type PingMessage = (typeof pingMessages)[number];

/**
 * Ping request post body.
 */
export interface PostPingRequestBody {
    message: PingMessage;
}

/**
 * Possible deployment environments.
 */
export const deploymentEnvironments = ["production", "development", "test"] as const;
/**
 * Possible deployment environments union type.
 */
export type DeploymentEnvironment = (typeof deploymentEnvironments)[number];

/**
 * Ping success response body.
 */
export interface GetPingSuccessResponseData {
    environment: DeploymentEnvironment;
}

/**
 * The `ping` module wrapper.
 */
export class PingCollection extends Collection {
    constructor(options: CollectionInitOptions) {
        super(options);
    }

    /**
     * Get ping response.
     */
    async getPing() {
        return this.client.query<GetPingSuccessResponseData>();
    }

    /**
     * Get a ping response based on request body.
     *
     * @param body PostPingRequestBody
     */
    async postPing(body: PostPingRequestBody) {
        return this.client.query<GetPingSuccessResponseData>({ method: "POST", json: body });
    }
}
