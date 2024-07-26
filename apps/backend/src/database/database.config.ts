import { registerAs } from "@nestjs/config";

export const DatabaseConfigKey = "database";

export interface DatabaseConfig {
    postgres: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
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
        }) satisfies DatabaseConfig,
);
