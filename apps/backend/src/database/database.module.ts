import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./typeorm.config.service";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./database.config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "./mongoose.config.service";
import { User } from "../users/user.entity";
import { MongooseUser, MongooseUserSchema } from "../users/user.schema";

@Module({
    imports: [
        ConfigModule.forRoot({ cache: true, load: [databaseConfig] }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            imports: [ConfigModule.forFeature(databaseConfig)],
        }),
        TypeOrmModule.forFeature([User]),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
            imports: [ConfigModule.forFeature(databaseConfig)],
        }),
        MongooseModule.forFeature([{ name: MongooseUser.name, schema: MongooseUserSchema }]),
    ],
    exports: [TypeOrmModule, MongooseModule],
})
export class DatabaseModule {}
