import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRopository: UserRepository,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRopository.createUser(authCredentialsDto);
    }
}
