import { Controller } from '@nestjs/common';
import { Body, Get, Post, UseGuards, Param } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from './event.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateConversationDto } from './dto/event.dto';
import { CreateMessageDto } from './dto/event.dto';

@Controller('event')
@UseGuards(AuthGuard())
export class EventController {
    constructor(
        private eventService: EventService,
    ) {}

    // @Post('/create-room')
    // async createRoom(
    //     @GetUser() user: User,
    //     @Body() CreateConversationDto: CreateConversationDto,   
    // ): Promise<{ code: number; success: boolean, Data:any }> {
    //     return this.eventService.createRoom(user, CreateConversationDto);
    // }

    @Get('/get-room')
    async getRoom(
        @GetUser() user: User,
    ): Promise<{ code: number; success: boolean, Data:any }> {
        const response = {
            code: 200,
            success: true,
            Data: await this.eventService.getRoom(user),
        }

        return response;
    
    }

    // @Post('/create-message')
    // async createMessage(
    //     @GetUser() user: User,
    //     @Body() CreateMessageDto: CreateMessageDto,
    // ): Promise<{ code: number; success: boolean, Data:any }> {
    //     const conversation = await this.eventService.getRoom(user);
    //     console.log(conversation.id);
    //     return this.eventService.createMessage(user, CreateMessageDto, conversation.id);
    // }

    @Get('/get-message')
    async getMessage(
        @GetUser() user: User,
        @Body() room_id: string,
    ): Promise<{ code: number; success: boolean, Data:any }> {

        const room = await this.eventService.getRoom(user);

        if (room.id !== room_id) {
            return {
                code: 400,
                success: false,
                Data: "해당 방에 접근할 수 없습니다."
            }
        }
        const response = {
            code: 200,
            success: true,
            Data: await this.eventService.getMessage(user, room_id),
        }

            return response;
    
    }
}

