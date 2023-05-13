import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { UserModel } from "./user.model";
import { Session } from "express-session";
import Redis from "ioredis";

@InputType()
export class RegisterInput {
  @Field() username!: string;
  @Field() password!: string;
  @Field() email!: string;
}

// export type UserCtx = Request & {
//   user: UserModel;
//   redisClient: Redis;
//   session?: Session;
// };

export type UserCtx = {
  req: Request & { session: Session; user: UserModel }; //  req.session.userId
  res: Response;
  redisClient: Redis;
};
