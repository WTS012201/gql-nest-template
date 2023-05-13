import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "../user.model";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserService } from "../user.service";
import { LocalStrategy } from "./LocalStrategy";
import { SessionSerializer } from "./SessionSerializer";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    PassportModule.register({ session: true }),
  ],
  providers: [AuthService, UserService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
