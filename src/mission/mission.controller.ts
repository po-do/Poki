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
        @GetUser() user: User,
        // @GetUserPushToken() pushToken: any
        ): Promise<Mission> {
        const mission = await this.missionService.createMission(createMissionDto, user_id);

        const title = '미션이 등록되었습니다!';
        const info = {
            result: 'success',
            mission: mission.content
        }
        const connect_id = await this.AuthService.getConnectedUser(user);

        const pushToken = await this.pushService.getPushToeknByUserId(connect_id);
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
        @GetUser() user: User,
        ): Promise<Mission> {
        const title = '자녀가 미션을 완료했어요!';
        const info = {
            result: 'success'
        }
        const connect_id = await this.AuthService.getConnectedUser(user);
        const pushToken = await this.pushService.getPushToeknByUserId(connect_id);


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
        @GetUser() user: User,
        ): Promise <Mission>{
        const title = '포도알 발급이 거절됐어요😥';
        const info = {
            result: 'success'
        }

        const connect_id = await this.AuthService.getConnectedUser(user);
        const pushToken = await this.pushService.getPushToeknByUserId(connect_id);

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

    @Post('/recommend/test/1')
    async getCachedMissionTestOne(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestOne(recommendMissionDto);
    }

    @Post('/recommend/test/2')
    async getCachedMissionTestTwo(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestTwo(recommendMissionDto);
    }

    @Post('/recommend/test/3')
    async getCachedMissionTestThree(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestThree(recommendMissionDto);
    }

    @Post('/recommend/test/4')
    async getCachedMissionTestFour(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestFour(recommendMissionDto);
    }

    @Post('/recommend/test/5')
    async getCachedMissionTestFive(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestFive(recommendMissionDto);
    }

    @Post('/recommend/test/6')
    async getCachedMissionTestSix(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestSix(recommendMissionDto);
    }

    @Post('/recommend/test/7')
    async getCachedMissionTestSeven(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestSeven(recommendMissionDto);
    }

    @Post('/recommend/test/8')
    async getCachedMissionTestEight(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestEight(recommendMissionDto);
    }

    @Post('/recommend/test/9')
    async getCachedMissionTestNine(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestNine(recommendMissionDto);
    }

    @Post('/recommend/test/10')
    async getCachedMissionTestTen(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestTen(recommendMissionDto);
    }

    @Post('/recommend/test/11')
    async getCachedMissionTestEleven(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestEleven(recommendMissionDto);
    }

    @Post('/recommend/test/12')
    async getCachedMissionTestTwelve(
        @Body() recommendMissionDto: RecommendMissionDto
    ): Promise<any> {
        return this.missionService.getCachedMissionTestTwelve(recommendMissionDto);
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
