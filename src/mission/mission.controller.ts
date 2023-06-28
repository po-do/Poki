import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { Mission } from './mission.entity';
import { MissionStatus } from './mission-status.enum';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { AuthGuard } from '@nestjs/passport'
import { GetUserId } from 'src/decorators/get-user.userid.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetUserType } from 'src/decorators/get-user.type.decorator';
import { AuthService } from 'src/auth/auth.service';
import { PushService } from 'src/push/push.service';
import { GetUserPushToken } from 'src/decorators/get-user.pushtoken.decorator';
import { RecommendMissionDto } from './dto/recommend-mission.dto';

@Controller('/mission')
@UseGuards(AuthGuard())
export class MissionController {
    constructor(private missionService: MissionService,
                private AuthService:AuthService,
                private pushService: PushService
                ){}

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createMission(
        @Body() createMissionDto: CreateMissionDto,
        @GetUserId() user_id: string,
        @GetUserPushToken() pushToken: string
        ): Promise<Mission> {
        const mission = await this.missionService.createMission(createMissionDto, user_id);

        const title = '미션이 등록되었습니다!';
        const info = {
            result: 'success',
            mission: mission.content
        }
        await this.pushService.push_noti(pushToken, title, info);
        return mission;
    }

    @Get('/detail/:mission_id')
    getMissionByMissionId(
        @Param('mission_id') mission_id: number,
        @GetUserId() user_id: string): Promise <Mission>{
        return this.missionService.getMissionByMissionId(mission_id, user_id);
    }

    @Post('/complete/:mission_id')
    async updateStatusCompleteByMissionId(
        @Param('mission_id') mission_id: number,
        @GetUserId() user_id: string,
        @GetUserPushToken() pushToken: string
        ): Promise<Mission> {
        const title = '자녀가 미션을 완료했어요!';
        const info = {
            result: 'success'
        }
        await this.pushService.push_noti(pushToken, title, info);
        return this.missionService.updateStatusByMissionId(mission_id, MissionStatus.WAIT_APPROVAL, user_id);
    }

    @Post('/approve/:mission_id')
    updateStatusApproveByMissionId(
        @Param('mission_id') mission_id: number,
        @GetUserId() user_id: string): Promise <Mission>{
        return this.missionService.updateStatusApproveByMissionId(mission_id, MissionStatus.COMPLETE, user_id);
    }

    @Post('/reject/:mission_id')
    async updateStatusRejectByMissionId(
        @Param('mission_id') mission_id: number,
        @GetUserId() user_id: string,
        @GetUserPushToken() pushToken: string
        ): Promise <Mission>{
        const title = '포도알 발급이 거절됐어요😥';
        const info = {
            result: 'success'
        }
        await this.pushService.push_noti(pushToken, title, info);
        return this.missionService.updateStatusRejectByMissionId(mission_id, MissionStatus.INCOMPLETE, user_id);
    }

    @Patch('/update/:mission_id')
    updateMissionByMissionId(
        @Param('mission_id') mission_id: number,
        @Body() updateMissionDto: UpdateMissionDto,
        @GetUserId() user_id: string): Promise <Mission> {
        return this.missionService.updateMissionByMissionId(mission_id, updateMissionDto, user_id);
    }

    @Delete('/delete/:mission_id')
    deleteMissionByMissionId(
        @Param('mission_id', ParseIntPipe) mission_id,
        @GetUserId() user_id: string): Promise<void>{
        return this.missionService.deleteMissionByMissionId(mission_id, user_id);
    }

    @Get('/user')
    async getMissionListByUserId(
        @GetUser() user:User,
        @GetUserId() id:number,
        @GetUserType() type: string): Promise <Mission[]> {

        if (type !== 'PARENT') {
            id = await this.AuthService.getConnectedUser(user);
        }
        
        return this.missionService.getMissionListByUserId(id);
    }

    @Get('/user/approve')
    async getApproveListByUserId(
        @GetUser() user:User,
        @GetUserId() id:number,
        @GetUserType() type:string): Promise <Mission[]> {

        if (type !== 'PARENT') {
            id = await this.AuthService.getConnectedUser(user);
        }
        return this.missionService.getApproveListByUserId(id);
    }

    @Post('/recommend')
    async getCachedMission(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {

        return this.missionService.getCachedMission(recommendMissionDto);
    }

    @Get('/user/incomplete')
    async getIncompleteListByUserId(
        @GetUser() user:User,
        @GetUserId() id:number,
        @GetUserType() type:string): Promise <Mission[]> {

        if (type !== 'PARENT') {
            id = await this.AuthService.getConnectedUser(user);
        }
        return this.missionService.getIncompleteListByUserId(id);
    }

}
