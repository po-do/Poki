import { Test, TestingModule } from '@nestjs/testing';
import { VideoChatGateway } from './video-chat.gateway';

describe('VideoChatGateway', () => {
  let gateway: VideoChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoChatGateway],
    }).compile();

    gateway = module.get<VideoChatGateway>(VideoChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
