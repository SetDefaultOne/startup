import { CollectionInitOptions } from "./collection";

export class QueryClient {
    private readonly config: QueryClientInitOptions;

    constructor(options: QueryClientInitOptions) {
        this.config = options;
    }

    async query<SuccessData = null, ErrorData = null, FailData = null>(
        options: QueryOptions = {},
    ): Promise<ExtendedResponseBody<SuccessData, ErrorData, FailData> | QueryClientFail> {
        const { url, version = "v1", collection } = this.config;
        const { path = "/", searchParams, method = "GET" } = options;

        let response: Response | undefined;

        let fetchOverrides = this.config.fetchOverrides || {};
        if (options.fetchOverrides) fetchOverrides = { ...fetchOverrides, ...options.fetchOverrides };

        try {
            response = await fetch(
                url +
                    version +
                    collection +
                    path +
                    (searchParams
                        ? "?" + new URLSearchParams(JSON.parse(JSON.stringify(searchParams))).toString()
                        : ""),
                {
                    method,
                    headers: {
                        "Content-Type": options.contentType ?? "application/json",
                    },
                    body:
                        "json" in options ? JSON.stringify(options.json) : "body" in options ? options.body : undefined,
                    ...fetchOverrides,
                },
            );
        } catch (error) {
            return {
                status: "error",
                message: "Couldn't send request.",
                response,
                error,
            } satisfies QueryClientFail;
        }

        let json: ExtendedResponseBody<SuccessData, ErrorData, FailData>;

        try {
            json = await response.json();
        } catch (error) {
            return {
                status: "error",
                message: "Couldn't parse JSON response.",
                response,
                error,
            } satisfies QueryClientFail;
        }

        json.response = response;

        return json;
    }
}

export interface QueryClientInitOptions extends CollectionInitOptions {}

export type QueryOptions = {
    path?: `/${string}`;
    searchParams?: Record<any, any>;
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    fetchOverrides?: RequestInit;
    contentType?: ContentType;
} & (
    | {
          contentType: ContentType;
          body: string;
      }
    | {
          json?: object;
      }
);

export type ContentType = `${string}/${string}` | `${string}/${string}; ${string}=${string}`;

export interface QueryClientFail {
    status: "error";
    message: string;
    error: unknown;
    response?: Response;
}

export function isQueryClientFail(result: ResponseBody<unknown, unknown, unknown> | QueryClientFail) {
    return result.status === "error" && "error" in result;
}

export function isQuerySuccess(result: ResponseBody<unknown, unknown, unknown> | QueryClientFail) {
    return result.status === "success";
}

export interface SuccessResponseBody<T> {
    status: "success";
    message?: string;
    data: T;
}

export interface ErrorResponseBody<T> {
    status: "error";
    message: string;
    data: T;
    code: `E-${string}`;
}

export interface FailResponseBody<T> {
    status: "fail";
    message: string;
    data: T;
}

export type ResponseBody<S = null, E = null, F = null> =
    | SuccessResponseBody<S>
    | ErrorResponseBody<E>
    | FailResponseBody<F>;

export type ExtendedResponseBody<S = null, E = null, F = null> = (
    | SuccessResponseBody<S>
    | ErrorResponseBody<E>
    | FailResponseBody<F>
) & {
    response: Response;
};
