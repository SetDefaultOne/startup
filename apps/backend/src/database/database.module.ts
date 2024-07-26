import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./typeorm.config.service";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./database.config";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            imports: [ConfigModule.forFeature(databaseConfig)],
        }),
    ],
})
export class DatabaseModule {}
