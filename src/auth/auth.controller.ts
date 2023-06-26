import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe, NotFoundException, Res, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from './user.entity';
import { UserType } from './user-type.enum';
import { PushDto } from 'src/push/dto/push.dto';
import { GetUserId } from 'src/decorators/get-user.userid.decorator';
import { PushService }  from 'src/push/push.service';   
import { GetUserType } from 'src/decorators/get-user.type.decorator';



@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private pushService: PushService,
    ) {}

    //localhost:3000/auth/signup
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authSignInDto: AuthSignInDto, @Body() pushDto: PushDto): Promise<{accessToken: string, type:string, id:number}> {
        return this.authService.siginIn(authSignInDto, pushDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
    // test(@Req() req): void {
        console.log(user);
    }

    @Get('/user/code')
    @UseGuards(AuthGuard())
    getConnectionCode(@GetUser() user: User): Promise<any> {
        return this.authService.getConnectionCode(user);
    }
    
    @Patch('/user/connect')
    @UseGuards(AuthGuard())
    async updateChildCode(
        @GetUser() user: User,
        @Body('connection_code') connection_code: string,
        ): Promise<{ connected: boolean; type: UserType }> {
            const child_id = user.user_id;
            
            const result = await this.authService.updateChildCode(child_id, connection_code);
        return { connected: result.connected, type: result.type };
        // connected true false만 반환하는 코드
        // await this.authService.updateChildCode(child_id, connection_code);
        // return { connected: true };
    }

    @Get('/connected-user')
    @UseGuards(AuthGuard())
    async getConnectedUser(@GetUser() user: User): Promise<any> {
        const connectedUser =  await this.authService.getConnectedUser(user);
    
        if (connectedUser) {
            //return connectedUser;
            return {
                code: 200,
                success: true,
                data: {
                  connected_user: connectedUser,
                  is_connected: true,
                },
              };
            } else {
                
                return {
                    code: 200,
                    success: true,
                    data: {
                    connected_user: null,
                    is_connected: false,
                    },
                };
            }
    }

    @Get('/connected-user/id')
    @UseGuards(AuthGuard())
    async getConnectedUserId(@GetUser() user: User): Promise<any> {
        const connectedUser =  await this.authService.getConnectedUser_id(user);
    
        if (connectedUser) {
            //return connectedUser;
            return {
                code: 200,
                success: true,
                data: {
                  connected_user: connectedUser,
                  is_connected: true,
                },
              };
            } else {
                
                return {
                    code: 200,
                    success: true,
                    data: {
                    connected_user: null,
                    is_connected: false,
                    },
                };
            }
    }

    @Get('/getPushToken')
    @UseGuards(AuthGuard())
    async getPushTokenByUserId(
        @GetUser() user: User,
       
    ): Promise<any> {
        console.log(user);
      
        const id = await this.authService.getConnectedUser(user);
        
        
        const response =  await this.pushService.getPushToeknByUserId(id);

        return response;
    
        };
}
