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
                host: process.env.POSTGRES_HOST,
                port: process.env.POSTGRES_PORT,
                username: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
            },
            mongodb: {
                host: process.env.MONGODB_HOST,
                port: process.env.MONGODB_PORT,
                username: process.env.MONGODB_USERNAME,
                password: process.env.MONGODB_PASSWORD,
                database: process.env.MONGODB_DATABASE,
            },
        }) satisfies DatabaseConfig,
);
