import { config } from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../../users/user.entity";
import migrations from "./migrations";

config();

const datasource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    migrationsTableName: "migrations",
    entities: [User],
    // NOTE: Migrations that are generated/created must be added to this list before running the database migration
    //  command. Those that have been generated but not added to this list won't be applied.
    migrations,
});

export default datasource;
