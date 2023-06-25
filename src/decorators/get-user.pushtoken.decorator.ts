import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUserPushToken = createParamDecorator((data, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest();
  // return req.user.push_connection[0].fcm_token;
  return 'dl_ooxMIQj6LD3jzN0Hefn:APA91bE3CquJvwx6-q6w2pE3cOWsa23gwf0vnu84aHK5LoQOf9zH5knPKa2Y1OXHS-6yTWGwjZtYqFbV46A1BsVJx1RUtJYnET3VTUDSW1Jh5dfu8TJdh1YcoJbrsBUbXolPYCFAF4Y7'
});