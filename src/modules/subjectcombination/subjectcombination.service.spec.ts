import { Test, TestingModule } from '@nestjs/testing';
import { SubjectcombinationService } from './subjectcombination.service';

describe('SubjectcombinationService', () => {
  let service: SubjectcombinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectcombinationService],
    }).compile();

    service = module.get<SubjectcombinationService>(SubjectcombinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
