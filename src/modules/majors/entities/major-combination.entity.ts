import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Major } from './major.entity';
import { SubjectCombination } from 'src/modules/subjectcombinations/entities/subjectcombination.entity';

@Entity('major_combinations')
export class MajorCombination {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Major, (major) => major.combinations)
  major: Major;

  @ManyToOne(() => SubjectCombination, (comb) => comb.majors)
  combination: SubjectCombination;
}
