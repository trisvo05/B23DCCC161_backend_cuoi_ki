import { MajorCombination } from 'src/modules/majors/entities/major-combination.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { MajorCombination } from './major-combination.entity';

@Entity('subject_combinations')
export class SubjectCombination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  subjects: string; // Ví dụ: "Toán - Lý - Hóa"

  @OneToMany(() => MajorCombination, mc => mc.combination)
  majors: MajorCombination[];
}
