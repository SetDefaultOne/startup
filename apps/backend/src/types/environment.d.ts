import { DeploymentEnvironment } from "@bootstrap-brand/sdk";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: DeploymentEnvironment;
            HOST: string;
            PORT: number;
            POSTGRES_HOST: string;
            POSTGRES_PORT: number;
            POSTGRES_USERNAME: string;
            POSTGRES_PASSWORD: string;
            POSTGRES_DATABASE: string;
            MONGODB_HOST: string;
            MONGODB_PORT: number;
            MONGODB_USERNAME: string;
            MONGODB_PASSWORD: string;
            MONGODB_DATABASE: string;
            ENCRYPTION_INITIALIZATION_VECTOR: string;
            ENCRYPTION_SECRET: string;
            JWT_SECRET: string;
        }
    }
}

export {};
