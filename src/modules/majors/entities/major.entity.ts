import { School } from 'src/modules/schools/entities/school.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MajorCombination } from './major-combination.entity';
import { Application } from 'src/modules/applications/entities/application.entity';

@Entity('majors')
export class Major {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => School, (school) => school.majors)
  school: School;

  @OneToMany(() => MajorCombination, (mc) => mc.major)
  combinations: MajorCombination[];

  @OneToMany(() => Application, (app) => app.major)
  applications: Application[];
}
