import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from './user.entity';

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
}
