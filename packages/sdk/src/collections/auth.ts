import { QueryClient, QueryOptions } from "../lib/queryClient";
import { User } from "./users";

export interface SignInRequestBody {
    username: string;
    password: string;
}

export interface SignUpSuccessResponseData {
    user: User;
}

export interface SignInSuccessResponseData extends SignUpSuccessResponseData {}

export type SignOutSuccessResponseData = null;

export type GetMeSuccessResponseData = User;

export class AuthCollection {
    constructor(private readonly client: QueryClient) {}

    async signIn(body: SignInRequestBody, options: QueryOptions = {}) {
        return this.client.query<SignInSuccessResponseData>("/", { method: "POST", json: body, ...options });
    }
}
