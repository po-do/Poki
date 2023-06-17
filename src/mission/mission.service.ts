import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMissionDto } from './dto/create-mission.dto';
import { Mission } from './mission.entity';
import { MissionRepository } from './mission.repository';
import { MissionStatus } from './mission-status.enum';
import { UpdateMissionDto } from './dto/update-mission.dto';

@Injectable()
export class MissionService {
    constructor(
        @InjectRepository(MissionRepository)
        private missionRepository: MissionRepository
    ) {}

    createMission(createMissionDto: CreateMissionDto, user_id: string): Promise <Mission> {
        return this.missionRepository.createMission(createMissionDto, user_id);
    }

    async getMissionByMissionId(mission_id: number, user_id: string): Promise <Mission> {
        const mission = await this.missionRepository.findOneBy({id: mission_id});

        if (!mission) {
            throw new NotFoundException(`Can't find Mission with id ${mission_id}`);
        }
        
        return mission;
    }

    async updateStatusByMissionId(mission_id: number, mission_status: MissionStatus, user_id: string): Promise <Mission> {
        const mission = await this.getMissionByMissionId(mission_id, user_id);
        mission.status = mission_status;
        
        await this.missionRepository.save(mission);
        return mission;
    }

    async updateMissionByMissionId(mission_id: number, updateMissionDto: UpdateMissionDto, user_id: string): Promise <Mission> {
        const mission = await this.getMissionByMissionId(mission_id, user_id);

        mission.content = updateMissionDto.content;
        mission.created_date = updateMissionDto.created_date;
        
        await this.missionRepository.save(mission);
        return mission;
    }

    async updateStatusApproveByMissionId(mission_id: number, updateMissionDto: MissionStatus, user_id: string): Promise <Mission> {
        const mission = await this.updateStatusByMissionId(mission_id, updateMissionDto, user_id);
        /*  */

        return mission;
    }

    async updateStatusRejectByMissionId(mission_id: number, updateMissionDto: MissionStatus, user_id: string): Promise <Mission> {
        const mission = await this.updateStatusByMissionId(mission_id, updateMissionDto, user_id);

        return mission;
    }

    async deleteMissionByMissionId(mission_id: number, user_id: string): Promise <void> {
        const query = this.missionRepository.createQueryBuilder('mission');
        const result = await this.missionRepository.delete({id: mission_id , user_id: user_id});

        if (result.affected === 0) {
            throw new NotFoundException(`Can't delete Mission with id ${mission_id}`)
        }
    }

    async getMissionListByUserId(id: number): Promise <Mission[]> {
        /* [TODO] user_id 받아오는 데코레이터 사용해서 부모이면 자신의 id 말고 자녀 id 받아오도록 */
        const query = await this.missionRepository.createQueryBuilder('mission');
        query.where('mission.user_id = :user_id', {user_id: id});

        const missions = await query.getMany();
        return missions;
    }

    async getApproveListByUserId(id: number): Promise <Mission[]> {
        /* [TODO] user_id 받아오는 데코레이터 사용해서 부모이면 자신의 id 말고 자녀 id 받아오도록 */
        const query = await this.missionRepository.createQueryBuilder('mission');
        query.where('mission.user_id = :user_id', {user_id: id}).andWhere('mission.status = :status', {status: MissionStatus.WAIT_APPROVAL});

        const missions = await query.getMany();
        return missions;
    }
}
