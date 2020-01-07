import { Test, TestingModule } from '@nestjs/testing';
import { RebelStarshipsController } from './rebel-starships.controller';

describe('RebelStarships Controller', () => {
  let controller: RebelStarshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RebelStarshipsController],
    }).compile();

    controller = module.get<RebelStarshipsController>(RebelStarshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
