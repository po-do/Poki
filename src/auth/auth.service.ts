import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { UserType } from './user-type.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    
   

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async siginIn(authSignInDto: AuthSignInDto):Promise<{accessToken: string, type:string, id:number}> {
        const { user_id, password } = authSignInDto;
        const user = await this.userRepository.findOneBy({ user_id });

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 (Secret + Payload)
            const payload = { user_id };
            const accessToken = await this.jwtService.sign(payload);

            
            return { accessToken, type: user.type, id: user.id };
        } else {
            throw new UnauthorizedException('login faild');
        }
    }

    async getConnectionCode(user : User): Promise<any> {
        const randomCode = this.getRandomCode();
        // const user = await this.userRepository.findOneBy({ user_id });

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
    // async updateChildCode(child_id: string, connection_code: string): Promise<void> {
    //     const child = await this.userRepository.findOneBy({ user_id: child_id });
    
    //     if (child) {
    //       child.code = connection_code;
    //       await this.userRepository.save(child);
    //     }
    //   }

    async updateChildCode(child_id: string, connection_code: string): Promise<{ connected: boolean; type: UserType }> {
        const child = await this.userRepository.findOneBy({ user_id: child_id });
        const parent = await this.userRepository.findOne( { where: { code: connection_code, type: UserType.PARENT } });

        if (parent) {
            // child.code = connection_code;
            // await this.userRepository.save(child);
            // 변동 사항 : uuid를 저장하는 것으로 수정
            const uuid = uuidv4();
            
            child.code = uuid;
            parent.code = child.code;

            await this.userRepository.save(child);
            await this.userRepository.save(parent);

            return { connected: true, type: UserType.PARENT };
        } else {
            
            return { connected: false, type: UserType.CHILD };
        }
    
        // if (child && child.type === UserType.CHILD && parent) {
        //   child.code = connection_code;
        //   await this.userRepository.save(child);
        //   return { connected: true, type: child.type };
        // } else {
        //   return { connected: false, type: null };
        // }
      }

    async getConnectedUser(user: User): Promise<any> {
        const { code, type } = user;
        const userType: UserType = type as UserType;
        const connectedUser = await this.userRepository.findOneByCodeAndDifferentType(code, userType);


        return connectedUser.id;
        
        // if (connectedUser) {
        //     //return connectedUser;
        //     return {
        //         code: 200,
        //         success: true,
        //         data: {
        //           connected_user: connectedUser.user_id,
        //         },
        //       };
        //     } else {
        //       throw new NotFoundException('Connected user not found');
        //     }
          }


    getRandomCode(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }

    // user_id를 넣으면 user의 type을 return하는 함수
    async getUserTypeToUserId(user_id: string): Promise<UserType | null> {
        const user = await this.userRepository.findOneBy( { user_id });

        if (user) {
            return user.type as UserType;
        }
        return null;
    }
}