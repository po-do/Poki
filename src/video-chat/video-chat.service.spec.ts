import { Test, TestingModule } from '@nestjs/testing';
import { VideoChatService } from './video-chat.service';

describe('VideoChatService', () => {
  let service: VideoChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoChatService],
    }).compile();

    service = module.get<VideoChatService>(VideoChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
