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

    async savePushToken(id: number, pushDto: PushDto): Promise <void> {
        const { fcm_token } = pushDto;

        const isTokenExists = await this.isTokenExists(id, fcm_token);
        
        if (!isTokenExists && fcm_token == null) {
            const pushConnection = this.create({
                fcm_token,
                user: { id },
        });

        await this.save(pushConnection);
    }
}
    
    async isTokenExists(userId: number, fcmToken: string): Promise<boolean> {
        const existingPushConnection = await this.findOne({ where: { user: { id: userId }, fcm_token: fcmToken } });
        return !!existingPushConnection; // 중복된 토큰이 존재하면 true, 그렇지 않으면 false 반환
    }
}
