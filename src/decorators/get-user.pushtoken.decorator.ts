import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUserPushToken = createParamDecorator((data, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest();
  // return req.user.push_connection[0].fcm_token;
  return 'cLOzAiUl2cduSnjogNs3gG:APA91bE4uFI29BELfjpWK8OYXw_6CmECREsfJWOkYpoNnMliiYCkSZ0R76WuKd05g2n7jUyRi-Vu1rNsxCKZPvOHLM0t5X6RkNs_r9bE8mpm_SLRr97V4vb2eNAGI6QPktVy_SGqEaaw'
});