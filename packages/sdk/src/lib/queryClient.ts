import { ErrorCode, HostUrl } from "./common";

export class QueryClient {
    constructor(
        private readonly collection: `/${string}`,
        private readonly host: HostUrl,
        private readonly config: QueryClientConfig,
    ) {}

    /**
     * Query API using `fetch` under a specific collection and its resource path.
     *
     * @param path Resource path.
     * @param options Query function options.
     * @throws TypeError JSON stringify failure during serialization.
     * @throws SyntaxError JSON parse failure on deserialization.
     * @throws DOMException `fetch` query exception.
     */
    async query<SuccessData = null, FailData = null, ErrorData = null>(
        path: `/${string}` = "/",
        options: QueryOptions = {},
    ): Promise<QueryResult<SuccessData, FailData, ErrorData>> {
        const { version = "v1", fetchOptions: collectionFetchOptions = {} } = this.config;
        const {
            method = "GET",
            searchParams,
            headers = { "Content-Type": "application/json" },
            credentials = "include",
            signal,
            fetchOptions: queryFetchOptions = {},
        } = options;

        const urlSearchParams = searchParams ? `?${new URLSearchParams(searchParams as Record<string, string>)}` : "";
        const body = "json" in options ? JSON.stringify(options.json) : "body" in options ? options.body : undefined;

        const response = await fetch(this.host + version + this.collection + path + urlSearchParams, {
            method,
            credentials,
            headers,
            body,
            signal,
            ...collectionFetchOptions,
            ...queryFetchOptions,
        });

        const json: QueryResult<SuccessData, FailData, ErrorData> = await response.json();

        json.success = json.status === "success";
        json.fail = json.status === "fail";
        json.error = json.status === "error";

        json.response = response;

        return json;
    }
}

export interface QueryClientConfig {
    version?: `v${number}`;
    fetchOptions?: RequestInit;
}

export type QueryOptions = {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    headers?: HeadersInit;
    credentials?: RequestCredentials;
    searchParams?: object;
    signal?: AbortSignal;
    fetchOptions?: RequestInit;
} & ({ body?: BodyInit } | { json?: object });

export type QueryResult<SuccessData = null, FailData = null, ErrorData = null> = (
    | (QuerySuccessBody<SuccessData> & QueryResultBooleans<true>)
    | (QueryFailBody<FailData> & QueryResultBooleans<false, true>)
    | (QueryErrorBody<ErrorData> & QueryResultBooleans<false, false, true>)
) & { response: Response };

export type QueryResultBooleans<S = false, F = false, E = false> = {
    success: S;
    fail: F;
    error: E;
};

export type QuerySuccessBody<T = null> = {
    status: "success";
    message?: string;
    data: T;
    pagination?: {
        page: number;
        size: number;
        limit: number;
    };
};

export type QueryFailBody<T = null> = {
    status: "fail";
    message: string;
    data: T;
};

export type QueryErrorBody<T = null> = {
    status: "error";
    message: string;
    data: T;
    code: ErrorCode;
};

export type QueryResponse<SuccessData = null, FailData = null, ErrorData = null> =
    | QuerySuccessBody<SuccessData>
    | QueryFailBody<FailData>
    | QueryErrorBody<ErrorData>;
