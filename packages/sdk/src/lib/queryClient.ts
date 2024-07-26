import { CollectionInitOptions } from "./collection";

/**
 * Query client instance that stores configuration for actual queries.
 *
 * @param config { QueryClientInitOptions } Config options for queries.
 */
export class QueryClient {
    /**
     * Store instance specific query customization options.
     */
    private readonly config: QueryClientInitOptions;

    constructor(options: QueryClientInitOptions) {
        this.config = options;
    }

    /**
     * Query function that makes the `fetch` requests. Its behavior can be customized globally through the
     * `QueryClientInitOptions` for `QueryClient` or through the `options` param.
     *
     * @param options Query customization options override. Prioritize argument options over instance options defined
     * during initialization.
     */
    async query<SuccessData = null, ErrorData = null, FailData = null>(
        options: QueryOptions = {},
    ): Promise<ExtendedResponseBody<SuccessData, ErrorData, FailData> | QueryClientFail> {
        // Extract out values from global config. Some properties are optional and given default values.
        const { url, version = "v1", collection } = this.config;

        // Options passed for query specific customization.
        const { path = "/", searchParams, method = "GET" } = options;

        // Response object received from `fetch` in case of successful request. Could be undefined due to client
        // failure.
        let response: Response | undefined;

        // Prioritize query fetch overrides over global ones.
        let fetchOverrides = this.config.fetchOverrides || {};
        if (options.fetchOverrides) fetchOverrides = { ...fetchOverrides, ...options.fetchOverrides };

        // NOTE: Failing this means a client failure and the request never made it to the server.
        try {
            // Use native `fetch` API to make HTTP requests. `fetch` could vary based on the environment the code is
            // being ran on however, the standard is similar across most platforms.
            response = await fetch(
                url + // Base URL - https://localhost:4200/
                    version + // API version - v1
                    collection + // Route - /ping
                    path + // Resource - :uuid
                    (searchParams // Optional query search params.
                        ? "?" +
                          new URLSearchParams(
                              // NOTE: This routine is heavily optimized in most JavaScript engines and is done to
                              // guarantee proper serialization of the data being sent to the server. Could cause
                              // crashes if circular data structures are being serialized.
                              JSON.parse(JSON.stringify(searchParams)),
                          ).toString()
                        : ""),
                {
                    method, // Request method - GET | POST | PATCH | DELETE
                    headers: {
                        // Mandatory request headers. Can be overridden through `options`.
                        "Content-Type": options.contentType ?? "application/json",
                    },
                    body:
                        "json" in options // Choose between raw `body` and a JSON structure.
                            ? JSON.stringify(options.json) // `body` has a `json` field and thus can be stringified.
                            : "body" in options
                              ? options.body // Raw `body` is being passed with a mandatory `Content-Type` header.
                              : undefined, // Request body is left empty.
                    ...fetchOverrides,
                },
            );
        } catch (error) {
            // Client failure during `fetch`. Could be device specific issue as the server never got to receive the
            // request sent by the client. Client errors must contain the thrown exception that caused the request to
            // be discarded.
            return {
                status: "error",
                message: "Couldn't send request.",
                response,
                error,
            } satisfies QueryClientFail;
        }

        // Yet to be parsed response body. Could be a valid response from the server or another client failure based on
        // the parsing logic for JSON responses.
        let json: ExtendedResponseBody<SuccessData, ErrorData, FailData>;

        try {
            // CAUTION: Do not call the `.json()` method on a response object more than once.
            json = await response.json();
        } catch (error) {
            // Server didn't send a valid JSON response. This is categorized as a client failure as the server didn't
            // send any meaningful data as to why it didn't send a response in JSON. The `response` object is part of
            // the returned value and thus can be manually inspected for errors.
            return {
                status: "error",
                message: "Couldn't parse JSON response.",
                response,
                error,
            } satisfies QueryClientFail;
        }

        // Attach the `response` object to the returned value.
        json.response = response;

        return json;
    }
}

/**
 * Query client is drilled down its config options from the SDK init config. In case at any level these values need to
 * be modified, the interface remains the same.
 */
export interface QueryClientInitOptions extends CollectionInitOptions {}

/**
 * Individual query configuration. These configs persist only for the request lifecycle and do not carry on to the next
 * request made from even the same query client.
 */
export type QueryOptions = {
    /**
     * A resource path under the collection.
     *
     * @warn Resource paths must contain a leading `/`.
     *
     * @example
     * /:uuid
     */
    path?: `/${string}`;
    /**
     * A key value pair of query search parameters that will be part of the request URI. Nested values can be used as
     * well as complex data structures as long as it can be serialized into query parameters.
     *
     * @warn Key value pairs must be JSON serializable otherwise an exception will be thrown.
     *
     * @example
     * ```typescript
     * {
     *     username: "SetDefaultOne"
     * }
     * ```
     */
    searchParams?: Record<any, any>;
    /**
     * Standard HTTP request methods.
     *
     * @default "GET"
     */
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    /**
     * Query specific fetch options override. Prioritized over collection and SDK fetch overrides.
     *
     * @warn Overriding properties are not merged. They will replace any previous value set by the collection or SDK.
     */
    fetchOverrides?: RequestInit;
    /**
     * Request body's content type.
     *
     * @default "application/json"
     */
    contentType?: ContentType;
} & (
    | {
          // When passing an explicit `Content-Type` header it's mandatory to set a body along with it.
          contentType: ContentType;
          body: string;
      }
    | {
          // A JSON structure can be sent as the body with it's appropriate `Content-Type` header being set by default.
          json?: object;
      }
);

/**
 * Valid string representation for Content-Type headers.
 */
export type ContentType = `${string}/${string}` | `${string}/${string}; ${string}=${string}`;

/**
 * Query client failure. Suggests faulty requests being made that don't reach the server.
 */
export interface QueryClientFail {
    status: "error";
    message: string;
    error: unknown;
    response?: Response;
}

/**
 * Type guard to narrow down a client failure on query.
 *
 * @param result A result object received from a query client's request.
 * @returns boolean
 */
export function isQueryClientFail(result: ResponseBody<unknown, unknown, unknown> | QueryClientFail) {
    return result.status === "error" && "error" in result;
}

/**
 * Type guard to narrow down a successful response on query.
 *
 * @param result A result object received from a query client's request.
 * @returns boolean
 */
export function isQuerySuccess(result: ResponseBody<unknown, unknown, unknown> | QueryClientFail) {
    return result.status === "success";
}

/**
 * Successful API response. Client gets the data it requested for.
 */
export interface SuccessResponseBody<T> {
    status: "success";
    message?: string;
    data: T;
}

/**
 * Error API response. Could be a permission issue or invalid resource that was requested.
 */
export interface ErrorResponseBody<T> {
    status: "error";
    message: string;
    data: T;
    code: `E-${string}`;
}

/**
 * Validation failure response. Client sent invalid data to the server.
 */
export interface FailResponseBody<T> {
    status: "fail";
    message: string;
    data: T;
}

/**
 * An unknown state of the server's response that needs to be narrowed down based on the `status` field. Use helper
 * guard functions for the narrowing.
 */
export type ResponseBody<S = null, E = null, F = null> =
    | SuccessResponseBody<S>
    | ErrorResponseBody<E>
    | FailResponseBody<F>;

/**
 * Extended response body that includes the response object from the `fetch` request.
 */
export type ExtendedResponseBody<S = null, E = null, F = null> = (
    | SuccessResponseBody<S>
    | ErrorResponseBody<E>
    | FailResponseBody<F>
) & {
    response: Response;
};
