import { Collection, CollectionInitOptions } from "../lib/collection";

export interface User {
    uuid: string;
    username: string;
    // WARN: This is a lie. Timestamps can never be of native JavaScript `Date` type as the data is always serialized.
    //  This was done in order to maintain cross-project type compatibility. One side had to lie and for now it shall
    //  be the client.
    // TODO: Figure out a way to convince TypeScript to send native Date objects to these serialized interfaces that
    //  expect timestamps to be strings.
    createdAt: string | Date;
}

/**
 * Search parameters to get multiple users by.
 */
export interface GetUsersRequestSearchParams {
    username: string;
}

/**
 * Response data for multiple users.
 */
export type GetUsersSuccessResponseData = User[];

/**
 * Response data for a single user.
 */
export type GetUserSuccessResponseData = User;

/**
 * The `users` module wrapper.
 */
export class UsersCollection extends Collection {
    constructor(options: CollectionInitOptions) {
        super(options);
    }

    /**
     * Get multiple users based on a search filter.
     *
     * @param searchParams { GetUsersRequestSearchParams } Search params to filter users by.
     */
    async getUsers(searchParams: GetUsersRequestSearchParams) {
        return this.client.query<GetUsersSuccessResponseData>({ searchParams });
    }

    /**
     * Get a single user data based on their uuid.
     *
     * @param uuid string
     */
    async getUser(uuid: string) {
        return this.client.query<GetUserSuccessResponseData>({ path: `/${uuid}` });
    }
}
