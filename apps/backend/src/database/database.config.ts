import { registerAs } from "@nestjs/config";

export const DatabaseConfigKey = "database";

export type GenericDatabaseConnectionConfig = {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
};

export interface DatabaseConfig {
    postgres: GenericDatabaseConnectionConfig;
    mongodb: GenericDatabaseConnectionConfig;
}

export default registerAs(
    DatabaseConfigKey,
    () =>
        ({
            postgres: {
                host: process.env.POSTGRES_HOST as string,
                port: Number(process.env.POSTGRES_PORT) as number,
                username: process.env.POSTGRES_USERNAME as string,
                password: process.env.POSTGRES_PASSWORD as string,
                database: process.env.POSTGRES_DATABASE as string,
            },
            mongodb: {
                host: process.env.MONGODB_HOST as string,
                port: Number(process.env.MONGODB_PORT) as number,
                username: process.env.MONGODB_USERNAME as string,
                password: process.env.MONGODB_PASSWORD as string,
                database: process.env.MONGODB_DATABASE as string,
            },
        }) satisfies DatabaseConfig,
);
