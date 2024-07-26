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

export interface GetUsersRequestSearchParams {
    username: string;
}

export type GetUsersSuccessResponseData = User[];

export type GetUserSuccessResponseData = User;

export class UsersCollection extends Collection {
    constructor(options: CollectionInitOptions) {
        super(options);
    }

    async getUsers(searchParams: GetUsersRequestSearchParams) {
        return this.client.query<GetUsersSuccessResponseData>({ searchParams });
    }

    async getUser(uuid: string) {
        return this.client.query<GetUserSuccessResponseData>({ path: `/${uuid}` });
    }
}
