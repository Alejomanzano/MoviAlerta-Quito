import { Test, TestingModule } from '@nestjs/testing';
import { IncidencesController } from './incidences.controller.js';

describe('IncidencesController', () => {
  let controller: IncidencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncidencesController],
    }).compile();

    controller = module.get<IncidencesController>(IncidencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
