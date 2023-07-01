import { InjectRepository } from "@nestjs/typeorm";
import { PushConnection } from "./push.entity";
import { Injectable } from "@nestjs/common";
import { DataSource, LessThan, Repository } from "typeorm";
import { PushDto } from "./dto/push.dto";


@Injectable()
export class PushConnectionRepository extends Repository<PushConnection> {
    constructor(private dataSource: DataSource) {
        super(PushConnection, dataSource.createEntityManager());
    }

    async savePushToken(id: number, pushDto: PushDto): Promise <void> {
        const { fcm_token } = pushDto;

        const isTokenExists = await this.isTokenExists(id, fcm_token);
        console.log(isTokenExists);
        console.log(fcm_token);
        
        if (!isTokenExists && fcm_token !== '') {
            const pushConnection = this.create({
                fcm_token,
                createdAt: new Date(), // 현재 시간
                user: { id },
        });

        await this.save(pushConnection);
    }
      // 1분 지난 토큰 삭제 로직 호출
      setTimeout(async () => {
        await this.deleteExpiredTokens();
    }, 60000); // 1분(60,000밀리초) 후에 삭제 로직 실행
}
    
    async isTokenExists(userId: number, fcmToken: string): Promise<boolean> {
        const existingPushConnection = await this.findOne({ where: { user: { id: userId }, fcm_token: fcmToken } });
        return !!existingPushConnection; // 중복된 토큰이 존재하면 true, 그렇지 않으면 false 반환
    }

     async deleteExpiredTokens(): Promise<void> {
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() - 1); // 현재 시간으로부터 1분 전 시간 설정

        await this.createQueryBuilder()
            .delete()
            .from(PushConnection)
            .where("createdAt <= :expirationTime", { expirationTime })
            .execute();
    }

}
