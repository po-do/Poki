import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from './user.entity';
import { ConnectUserDto } from './dto/auth-connectuser.dto';
import { UserType } from './user-type.enum';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    //localhost:3000/auth/signup
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authSignInDto: AuthSignInDto): Promise<{accessToken: string}> {
        return this.authService.siginIn(authSignInDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
    // test(@Req() req): void {
        console.log('user', user);
    }

    @Get('/user/code')
    @UseGuards(AuthGuard())
    getConnectionCode(@GetUser() user: User): Promise<any> {
        return this.authService.getConnectionCode(user);
    }

    @Patch('/user/connect')
    @UseGuards(AuthGuard())
    async updateChildCode(
      @Body('child_id') child_id: string,
      @Body('connection_code') connection_code: string,
        ): Promise<{ connected: boolean; type: UserType }> {
            const result = await this.authService.updateChildCode(child_id, connection_code);
        return { connected: result.connected, type: result.type };
        // connected true false만 반환하는 코드
        // await this.authService.updateChildCode(child_id, connection_code);
        // return { connected: true };
    }

    @Get('/connected-user')
    @UseGuards(AuthGuard())
    getConnectedUser(@GetUser() user: User): Promise<any> {
        return this.authService.getConnectedUser(user);
    }
}
