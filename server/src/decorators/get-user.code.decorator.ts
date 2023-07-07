import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "../auth/user.entity";

export const GetUserCode = createParamDecorator((data, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest();
  return req.user.code;
});

