import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(
      GqlExecutionContext.create(ctx)
    )) as boolean;
    const request = ctx.switchToHttp().getRequest();
    await super.logIn(request);

    return result;
  }
}

@Injectable()
export class UserAuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<any> {
    const req = GqlExecutionContext.create(ctx)
      .switchToHttp()
      .getRequest<Request>();

    return req.isAuthenticated();
  }
}
