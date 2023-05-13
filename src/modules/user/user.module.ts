import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
