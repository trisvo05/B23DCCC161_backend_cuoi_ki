import { Test, TestingModule } from '@nestjs/testing';
import { SubjectcombinationsService } from './subjectcombinations.service';

describe('SubjectcombinationsService', () => {
  let service: SubjectcombinationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectcombinationsService],
    }).compile();

    service = module.get<SubjectcombinationsService>(SubjectcombinationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
