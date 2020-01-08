import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';

describe('Starships Controller', () => {
  let controller: StarshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
