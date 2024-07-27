import { QueryClient, QueryOptions } from "../lib/queryClient";
import { TimestampLike } from "../lib/common";

export interface User {
    uuid: string;
    username: string;
    createdAt: TimestampLike;
}

export interface GetUsersRequestSearchParams {
    username: string;
}

export type GetUsersSuccessResponseData = User[];

export type GetUserSuccessResponseData = User;

export class UsersCollection {
    constructor(private readonly client: QueryClient) {}

    async getUsers(searchParams: GetUsersRequestSearchParams, options: QueryOptions = {}) {
        return this.client.query<GetUsersSuccessResponseData>("/", { searchParams, ...options });
    }

    async getUser(uuid: string, options: QueryOptions = {}) {
        return this.client.query<GetUserSuccessResponseData>(`/${uuid}`, options);
    }
}
