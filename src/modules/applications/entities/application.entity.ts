import { Document } from 'src/modules/documents/entities/document.entity';
import { Major } from 'src/modules/majors/entities/major.entity';
import { SubjectCombination } from 'src/modules/subjectcombinations/entities/subjectcombination.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.applications)
  user: User;

  @ManyToOne(() => Major, major => major.applications)
  major: Major;

  @ManyToOne(() => SubjectCombination)
  combination: SubjectCombination;

  @Column({ type: 'json' })
  personalInfo: any;

  @Column({ type: 'float' })
  score: number;

  @Column({ nullable: true })
  priorityObject: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Document, doc => doc.application)
  documents: Document[];
}
