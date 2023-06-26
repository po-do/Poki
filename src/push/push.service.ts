import { Injectable, Response } from "@nestjs/common";
import { PushConnectionRepository } from "./push-connection.repository";
import { PushDto } from "./dto/push.dto";
import { InjectRepository } from "@nestjs/typeorm";
import * as admin from 'firebase-admin';
import { AuthGuard } from "@nestjs/passport";
import { UseGuards } from "@nestjs/common";
import { response } from "express";
import { NotFoundException } from "@nestjs/common";



@UseGuards(AuthGuard())
@Injectable()
export class PushService {
  constructor(
    @InjectRepository(PushConnectionRepository)
    private pushConnectionRepository: PushConnectionRepository
    ) {}

  async savePushToken(user_id: number, pushDto: PushDto): Promise <void> {
    await this.pushConnectionRepository.savePushToken(user_id, pushDto);
  }

  async getPushToeknByUserId(user_id: number): Promise <any> {
    const query = this.pushConnectionRepository.createQueryBuilder('push_connection');
        query.where('push_connection.userId = :userId', {userId: user_id});

        if (!query) {
            throw new NotFoundException(`Wishlist with user ID "${user_id}" not found`);
        }
        const pushConnection = await query.getMany();

        const fcm_token_list = pushConnection.map((item) => item.fcm_token);
        
        console.log(fcm_token_list);
        
        return fcm_token_list;

    }

  async push_noti(pushToken: string[], title: string, body: any): Promise <void> {
    // Firebase 서비스 계정 키(JSON 파일)의 절대 경로를 가져옵니다.
    // 푸시 메시지 내용
    const message = {
      notification: {
        title: title,
        body: JSON.stringify(body),
      },
      tokens: pushToken,
      webpush: {
        fcmOptions: {
          link: 'https://pokids.site/',
        },
      },
    };
    console.log(message);
    console.log(pushToken);
    console.log(response);
    // 푸시 알림 보내기
    admin
      .messaging()
      .sendEachForMulticast(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }

}