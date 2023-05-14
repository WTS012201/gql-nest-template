import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserModel } from "../user.model";
import { UserService } from "../user.service";

// this attaches the user entity on req if authenticated
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(UserService) private readonly userService: UserService) {
    super();
  }

  serializeUser(user: UserModel, done: (err: any, user: number) => void) {
    done(null, user.id);
  }

  async deserializeUser(
    user: UserModel,
    done: (err: any, user: UserModel | null) => void
  ) {
    const userDB = await this.userService.findUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
