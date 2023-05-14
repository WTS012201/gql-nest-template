import { UserModel } from "./user.model";
import { Resolver, Mutation, Args, Query, Context } from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Credentials, Ctx, LoginCredentials } from "./user.dto";
import { GQLAuthGuard, LocalAuthGuard } from "./auth/auth.guard";

@Resolver(() => UserModel)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(@Args("options") options: Credentials): Promise<UserModel> {
    return await this.userService.create(options);
  }

  @Mutation(() => UserModel)
  @UseGuards(GQLAuthGuard, LocalAuthGuard)
  async login(
    @Args("credentials") _credentials: LoginCredentials,
    @Context() { req }: Ctx
  ): Promise<UserModel> {
    return req.user;
  }

  @Query(() => UserModel)
  async user(@Args("id") id: string): Promise<UserModel> {
    return await this.userService.findOne(id);
  }
}
