import { Test, TestingModule } from '@nestjs/testing';
import { SubjectcombinationsController } from './subjectcombinations.controller';
import { SubjectcombinationsService } from './subjectcombinations.service';

describe('SubjectcombinationsController', () => {
  let controller: SubjectcombinationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectcombinationsController],
      providers: [SubjectcombinationsService],
    }).compile();

    controller = module.get<SubjectcombinationsController>(SubjectcombinationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
