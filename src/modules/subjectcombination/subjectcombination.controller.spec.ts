import { Test, TestingModule } from '@nestjs/testing';
// import { SubjectcombinationController } from './subjectcombination.controller';
import { subjectcombinationService } from './subjectcombination.service';
import { SubjectcombinationController } from './subjectcombination.controller';
// import { SubjectcombinationService } from './subjectcombination.service';

describe('SubjectcombinationController', () => {
  let controller: SubjectcombinationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectcombinationController],
      providers: [subjectcombinationService],
    }).compile();

    controller = module.get<SubjectcombinationController>(
      SubjectcombinationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
