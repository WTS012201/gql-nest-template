import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { UserModel } from "./user.model";
import { Session } from "express-session";
import Redis from "ioredis";

@InputType()
export class Credentials {
  @Field() username!: string;
  @Field() password!: string;
  @Field() email!: string;
}

@InputType()
export class LoginCredentials {
  @Field() username!: string;
  @Field() password!: string;
}

export type Ctx = {
  req: Request & { session: Session; user: UserModel };
  res: Response;
  redisClient: Redis;
};
