import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMissionDto } from './dto/create-mission.dto';
import { Mission } from './mission.entity';
import { MissionRepository } from './mission.repository';
import { MissionStatus } from './mission-status.enum';
import { UpdateMissionDto } from './dto/update-mission.dto';
import * as config from 'config';
import { Configuration, OpenAIApi } from 'openai';
import { RecommendMissionDto } from './dto/recommend-mission.dto'
import { RedisService } from 'src/redis/redis.service';
import { LessThanOrEqual } from 'typeorm';

const openAIConfig = config.get('openAI');
const configuration = new Configuration({
    organization: openAIConfig.organization,
    apiKey: openAIConfig.key
  })
const openai = new OpenAIApi(configuration)

@Injectable()
export class MissionService {
    constructor(
        @InjectRepository(MissionRepository)
        private missionRepository: MissionRepository,
        private cacheManager: RedisService
    ) {}

    private todayDate(): string{
        let date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }

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
        
        if (mission_status == "COMPLETE"){
            mission.completed_date = this.todayDate();
        }
        
        await this.missionRepository.save(mission);
        return mission;
    }

    async updateMissionByMissionId(mission_id: number, updateMissionDto: UpdateMissionDto, user_id: string): Promise <Mission> {
        const mission = await this.getMissionByMissionId(mission_id, user_id);

        mission.content = updateMissionDto.content;
        if (new Date(updateMissionDto.created_date) >= new Date(this.todayDate()))
        {
            mission.created_date = updateMissionDto.created_date;
        }
        
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
        const query = await this.missionRepository.createQueryBuilder('mission');
        query.where('mission.user_id = :user_id', {user_id: id}).andWhere('mission.status = :status', {status: MissionStatus.WAIT_APPROVAL});

        const missions = await query.getMany();
        return missions;
    }

    async getIncompleteListByUserId(id: number): Promise <Mission[]> {
        const query = await this.missionRepository.createQueryBuilder('mission');
        var date = new Date();
        const currentDate =
          date.getFullYear().toString() +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          date.getDate().toString();
      
        query.where('mission.user_id = :user_id', {user_id: id}).andWhere('mission.status = :status', {status: MissionStatus.INCOMPLETE}).andWhere('mission.created_date <= :currentDate', {currentDate: currentDate});

        const missions = await query.getMany();
        return missions;
    }

    async getMissionRecommend(recommendMissionDto : RecommendMissionDto): Promise <any> {
        const {age, place, ability} = recommendMissionDto;
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "부모가 자식한데 시키는 일이고, 요청의 조건인 age, place, ability에 대해 주의해서 간단명료하게 대답해줘" },
                { role: "user", content: `너는 ${age}살 아이를 가지고 있는 부모님이야. 혼자 떨어져 있는 아이에게  ${place} 에서 수행할 만한 참신한 미션 5가지만 추천해줘. 아이의 ${ability} 능력을 향상시키는 일이었으면 좋겠어. 다음 내용은 꼭 지켜줘: 미션내용은 항상 10자 이내로 짧게, 다음과 같은 형식으로 "oo미션:미션내용"해줘. 그리고 각각의 미션명과 미션 내용은 모두 '-하기'와 같은 명사형으로 끝내` },
            ]
        });
        let text = response.data.choices[0].message.content;
        let items = text.split('\n').map(item => item.replace(/^\d+\.\s*/, ''));
        return { result: items };
    }

    async getCachedMission(recommendMissionDto : RecommendMissionDto): Promise <any> {
        // key를 이용, cached된 mission을 가져 옴
        const key = `mission:${recommendMissionDto.age}:${recommendMissionDto.place}:${recommendMissionDto.ability}`
        let missions = await this.cacheManager.get(key)
        
        if (!missions || missions.length < 15) { // 조절 요망, 같은 카테고리(key)에 대해 최대 n개 캐싱
            const mission = await this.getMissionRecommend(recommendMissionDto);
            await this.cacheManager.set(key, mission.result, 1500); // 조절 요망, ttl

            return mission;
        }

        const randomMission = this.randomizeData(missions, 5);
        return { result: randomMission };
    }

    private randomizeData(missions: any[], count: number): any {
        const shuffledMissions = missions.slice(0); // 배열 복사
        const result = [];
        let remaining = Math.min(count, shuffledMissions.length); // 최대 다섯 개의 요소 선택

        let currentIndex = shuffledMissions.length;
      
        while (remaining > 0) {
          const randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // 요소를 랜덤하게 선택하여 결과 배열에 추가
          [shuffledMissions[currentIndex], shuffledMissions[randomIndex]] = [shuffledMissions[randomIndex], shuffledMissions[currentIndex]];
          result.push(shuffledMissions[currentIndex]);
          remaining--;
        }

        return result;
    }
}
