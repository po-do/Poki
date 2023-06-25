import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUserPushToken = createParamDecorator((data, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest();
  return req.user.push_connection[0].fcm_token;
});