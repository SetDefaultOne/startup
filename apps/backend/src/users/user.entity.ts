import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({
        name: "username",
        type: "varchar",
        length: 24,
        unique: true,
    })
    username: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Exclude()
    @Column({
        name: "password_hash",
        type: "varchar",
        length: 60,
    })
    passwordHash: string;

    @Exclude()
    @Column({
        name: "auth_refresh_serial",
        type: "int",
        default: 1,
    })
    authRefreshSerial: number;

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn({
        name: "deleted_at",
    })
    deletedAt: Date | null;
}
