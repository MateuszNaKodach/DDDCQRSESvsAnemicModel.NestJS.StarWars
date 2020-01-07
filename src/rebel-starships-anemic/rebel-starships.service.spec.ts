import { Test, TestingModule } from '@nestjs/testing';
import { RebelStarshipsService } from './rebel-starships.service';

describe('RebelStarshipsService', () => {
  let service: RebelStarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RebelStarshipsService],
    }).compile();

    service = module.get<RebelStarshipsService>(RebelStarshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
