import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MongooseUserDocument = HydratedDocument<MongooseUser>;

@Schema()
export class MongooseUser {
    @Prop({ required: true })
    uuid: string;
}

export const MongooseUserSchema = SchemaFactory.createForClass(MongooseUser);
