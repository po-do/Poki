import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "../auth/user.entity";

export const GetUserType = createParamDecorator((data, ctx: ExecutionContext): number => {
  const req = ctx.switchToHttp().getRequest();
  return req.user.type;
});
