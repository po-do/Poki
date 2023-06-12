import { DataSource, Not, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ConnectUserDto } from "./dto/auth-connectuser.dto";
import { UserType } from "./user-type.enum";



@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { userid, password, username, type, code } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ userid, password: hashedPassword });

        user.userid = userid;
        user.username = username;
        user.type = type;
        user.code = code;

        try {
            await user.save();
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Existing userid');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findOneByCodeAndDifferentType(code: string, type: UserType): Promise<User | null> {
        const connectedUser = await this.findOne({ where: { code, type: Not(type) } });
        return connectedUser || null;
      }
}