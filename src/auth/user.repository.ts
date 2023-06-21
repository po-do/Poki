import { DataSource, Not, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserType } from "./user-type.enum";
import { IsNull } from "typeorm";



@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { user_id, password, user_name, type, code } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ user_id, password: hashedPassword });

        user.user_id = user_id;
        user.user_name = user_name;
        user.type = type;
        user.code = code;

        try {
            await user.save();
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Existing user_id');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findOneByCodeAndDifferentType(code: string, type: UserType): Promise<User | null> {
        const connectedUser = code ? await this.findOne({ where: { code, type: Not(type) } }) : null;
        return connectedUser || null;
      }
}