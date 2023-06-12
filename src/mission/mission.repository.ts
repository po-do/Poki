import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Mission } from "./mission.entity";
import { CreateMissionDto } from "./dto/create-mission.dto";
import { MissionStatus } from "./mission-status.enum";
import { User } from "src/auth/user.entity";

// [TODO] User 관련 처리
@Injectable()
export class MissionRepository extends Repository<Mission> {
    constructor(private dataSource: DataSource) {
        super(Mission, dataSource.createEntityManager());
    }

    async createMission(createMissionDto: CreateMissionDto, user_id: string): Promise <Mission> {
        const {content, created_date, completed_date} = createMissionDto;

        const mission = this.create({
            user_id: user_id,
            content,
            status: MissionStatus.INCOMPLETE,
            created_date,
            completed_date
        });

        await this.save(mission);
        return mission;
    }
}