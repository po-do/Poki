import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { Mission } from './mission.entity';
import { MissionStatus } from './mission-status.enum';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { AuthGuard } from '@nestjs/passport'
import { GetUserId } from 'src/decorators/get-user.userid.decorator';

@Controller('/mission')
@UseGuards(AuthGuard())
export class MissionController {
    constructor(private missionService: MissionService){}

    @Post('/create')
    @UsePipes(ValidationPipe)
    createMission(
        @Body() createMissionDto: CreateMissionDto,
        @GetUserId() user_id: string ): Promise<Mission> {
        return this.missionService.createMission(createMissionDto, user_id);
    }

    @Get('/detail/:mission_id')
    getMissionByMissionId(
        @Param('mission_id') mission_id: number,
        @GetUserId() user_id: string): Promise <Mission>{
        return this.missionService.getMissionByMissionId(mission_id, user_id);
    }

    @Post('/complete/:mission_id')
    updateStatusByMissionId(
        @Param('mission_id') mission_id: number,
        @GetUserId() user_id: string): Promise <Mission>{
        return this.missionService.updateStatusByMissionId(mission_id, MissionStatus.WAIT_APPROVAL, user_id);
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

    @Get('/user/:user_id')
    getMissionListByUserId(@Param('user_id') user_id: string): Promise <Mission[]> {
        return this.missionService.getMissionListByUserId(user_id);
    }

    @Get('/user/:user_id/approve')
    getApproveListByUserId(@Param('user_id') user_id: string): Promise <Mission[]> {
        return this.missionService.getApproveListByUserId(user_id);
    }
}
