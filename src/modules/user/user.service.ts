import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Credentials, LoginCredentials } from "./user.dto";
import { User } from "./user.model";
import * as argon2 from "argon2";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRep: Repository<User>
  ) {}

  async create(data: Credentials): Promise<User> {
    data.password = await argon2.hash(data.password);
    const createdUser = this.userRep.create(data);

    return await createdUser.save();
  }

  async loginByUsername(credentials: LoginCredentials): Promise<User> {
    const user = await this.userRep.findOneBy({
      username: credentials.username,
    });
    if (!user) {
      return null;
    }

    const valid = await argon2.verify(user.password, credentials.password);
    return valid ? user : null;
  }

  findUserById(id: number): Promise<User> {
    return this.userRep.findOneBy({ id });
  }
}
