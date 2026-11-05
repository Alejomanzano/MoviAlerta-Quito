import { Test, TestingModule } from '@nestjs/testing';
import { IncidencesService } from './incidences.service.js';

describe('IncidencesService', () => {
  let service: IncidencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncidencesService],
    }).compile();

    service = module.get<IncidencesService>(IncidencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
