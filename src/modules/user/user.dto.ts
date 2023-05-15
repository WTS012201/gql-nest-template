import { Field, InputType } from "@nestjs/graphql";
import { User } from "./user.model";
import { Session } from "express-session";
import Redis from "ioredis";
import { Request, Response } from "express";

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
  req: Request & { session: Session; user: User };
  res: Response;
  redisClient: Redis;
};
