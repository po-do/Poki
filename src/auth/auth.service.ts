import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { ConnectUserDto } from './dto/auth-connectuser.dto';
import { ConnectUserResponseDto } from './dto/auth-response.dto';
import { UserType } from './user-type.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRopository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRopository.createUser(authCredentialsDto);
    }

    async siginIn(authSignInDto: AuthSignInDto):Promise<{accessToken: string}> {
        const { userid, password } = authSignInDto;
        const user = await this.userRopository.findOneBy({ userid });

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 (Secret + Payload)
            const payload = { userid };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login faild');
        }
    }

    async getConnectionCode(user : User): Promise<any> {
        const randomCode = this.getRandomCode();
        // const user = await this.userRopository.findOneBy({ userid });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.type !== 'PARENT') {
            return {
                code: 400,
                success: false,
                message: 'Connection Failed',
            };
        }

        user.code = randomCode;
        await user.save();

        const response = {
            code: 200,
            success: true,
            data: {
                connection_code: randomCode,
            },
        };

        return response;
    }

    // connected true false만 반환하는 코드
    // async updateChildCode(childId: string, connectionCode: string): Promise<void> {
    //     const child = await this.userRopository.findOneBy({ userid: childId });
    
    //     if (child) {
    //       child.code = connectionCode;
    //       await this.userRopository.save(child);
    //     }
    //   }

    async updateChildCode(childId: string, connectionCode: string): Promise<{ connected: boolean; type: UserType }> {
        const child = await this.userRopository.findOneBy({ userid: childId });
        const parent = await this.userRopository.findOne( { where: { code: connectionCode, type: UserType.PARENT } });

        if (parent) {
            child.code = connectionCode;
            await this.userRopository.save(child);
            return { connected: true, type: UserType.PARENT };
        } else {
            return { connected: false, type: UserType.CHILD };
        }
    
        // if (child && child.type === UserType.CHILD && parent) {
        //   child.code = connectionCode;
        //   await this.userRopository.save(child);
        //   return { connected: true, type: child.type };
        // } else {
        //   return { connected: false, type: null };
        // }
      }

    getRandomCode(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }
}