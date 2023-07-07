import { Test, TestingModule } from '@nestjs/testing';
import { VideoChatController } from './video-chat.controller';

describe('VideoChatController', () => {
  let controller: VideoChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoChatController],
    }).compile();

    controller = module.get<VideoChatController>(VideoChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
