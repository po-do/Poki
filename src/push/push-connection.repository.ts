import { InjectRepository } from "@nestjs/typeorm";
import { PushConnection } from "./push.entity";
import { Injectable } from "@nestjs/common";
import { DataSource, LessThan, Repository } from "typeorm";
import { PushDto } from "./dto/push.dto";
import { Cron, CronExpression } from "@nestjs/schedule";


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

}
    
    async isTokenExists(userId: number, fcmToken: string): Promise<boolean> {
        const existingPushConnection = await this.findOne({ where: { user: { id: userId }, fcm_token: fcmToken } });
        return !!existingPushConnection; // 중복된 토큰이 존재하면 true, 그렇지 않으면 false 반환
    }

    @Cron(CronExpression.EVERY_WEEK, { timeZone: "Asia/Seoul" }) // 매 주 월요일 00:00:00에 실행되는 cron 작업
    async deleteExpiredTokens() {
        console.log("Running deleteExpiredTokens");
        const expirationTime = new Date();
        expirationTime.setDate(expirationTime.getDate() - 7); // 현재 시간으로부터 1주 전 시간 설정

        await this.createQueryBuilder()
            .delete()
            .from(PushConnection)
            .where("createdAt <= :expirationTime", { expirationTime })
            .execute();
    }

    async onModuleInit() {
        // 앱이 시작될 때 cron 작업 등록
        await this.deleteExpiredTokens();
    }

}
