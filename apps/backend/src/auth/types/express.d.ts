import { UserAccessToken } from "./userAccessToken";

declare global {
    namespace Express {
        interface Request {
            accessToken?: UserAccessToken;
        }
    }
}

export {};
