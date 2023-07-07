import { Body, Controller, Get, NotFoundException } from '@nestjs/common';
import { VideoChatService } from './video-chat.service';
import { ResponseDto } from './dto/response.dto';

@Controller('video-chat')
export class VideoChatController {
    constructor(private videoChatService: VideoChatService) {}

    @Get('/state')
    async getUserState(
        @Body('user_id') user_id: string) {
        try {
            const socketId = await this.videoChatService.findConnectionByUserId(user_id);
            return new ResponseDto(200, true, { available: true });
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                return new ResponseDto(200, true, {available: false})
            }
            return new ResponseDto(500, false, null)
        }
    }
}
