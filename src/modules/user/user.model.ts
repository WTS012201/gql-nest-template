import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class UserModel extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 25, nullable: false })
  username: string;

  @Field()
  @Column("text", { nullable: false })
  email: string;

  @Column("text", { nullable: false })
  password: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
