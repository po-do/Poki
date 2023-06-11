import { Controller } from '@nestjs/common';
import { MissionService } from './mission.service';

@Controller('mission')
export class MissionController {
    constructor(private missionService: MissionService){}
}
