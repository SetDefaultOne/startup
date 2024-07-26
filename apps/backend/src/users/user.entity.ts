import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

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

    @Exclude()
    @Column({
        name: "password_hash",
        type: "varchar",
        length: 512,
    })
    passwordHash: string;

    @Exclude()
    @Column({
        name: "password_salt",
        type: "varchar",
        length: 32,
    })
    passwordSalt: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: Date | null;
}
