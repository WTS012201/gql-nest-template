import { User } from "./user.model";
import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,
  Int,
  ResolveField,
  Root,
} from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Credentials, Ctx, LoginCredentials } from "./user.dto";
import { GqlAuthGuard, LocalAuthGuard } from "./auth/auth.guard";

@Resolver(User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args("credentials") credentials: Credentials,
    @Context() { req }: Ctx
  ): Promise<User> {
    const user = await this.userService.create(credentials);
    req.user = user;
    return user;
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  async login(
    @Args("credentials") _credentials: LoginCredentials,
    @Context() { req }: Ctx
  ): Promise<User> {
    return req.user;
  }

  @Mutation(() => Boolean)
  logout(@Context() { req, res }: Ctx): Promise<any> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("name");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Query(() => User)
  async userById(
    @Args("id", { type: () => Int }) id: number,
    @Context() { req: _req }: Ctx
  ): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @Query(() => User, { nullable: true })
  me(@Context() { req }: Ctx) {
    console.log(req.user.id);
    if (!req.user.id) {
      return null;
    }

    return User.findOne({ where: { id: req.user.id } });
  }

  // if selecting email from returned usermodel, wont show email unless it
  // matches your email, keep in mind n + 1 problem if doing queries here
  @ResolveField(() => String)
  email(@Root() user: User, @Context() { req }: Ctx) {
    if (req.user.id === user.id) {
      return user.email;
    }
    return "";
  }
}
