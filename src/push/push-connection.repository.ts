import { InjectRepository } from "@nestjs/typeorm";
import { PushConnection } from "./push.entity";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PushDto } from "./dto/push.dto";


@Injectable()
export class PushConnectionRepository extends Repository<PushConnection> {
    constructor(private dataSource: DataSource) {
        super(PushConnection, dataSource.createEntityManager());
    }

    async savePushToken(user_id: number, pushDto: PushDto): Promise <void> {
        console.log(pushDto);
        const { fcm_token } = pushDto;

        const pushConnection = this.create({
            user_id: user_id,
            fcm_token
        });

        await this.save(pushConnection);
        // const pushConnection = new PushConnection();
        // pushConnection.user_id = userId;
        // pushConnection.fcm_token = pushDto.fcm_token;
        // await this.pushConnectionRepository.save(pushConnection);
      }
    }
