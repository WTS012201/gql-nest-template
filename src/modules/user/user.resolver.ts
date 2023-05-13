import { UserModel } from "./user.model";
import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context as Ctx,
} from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterInput, UserCtx } from "./user.dto";
import { LocalAuthGuard } from "./auth/auth.guard";

@Resolver(() => UserModel)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args("options") options: RegisterInput
  ): Promise<UserModel> {
    return await this.userService.create(options);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => UserModel)
  async login(@Ctx() { req: { user } }: UserCtx) {
    return user;
  }

  @Query(() => UserModel)
  async user(@Args("id") id: string): Promise<UserModel> {
    return await this.userService.findOne(id);
  }
}
