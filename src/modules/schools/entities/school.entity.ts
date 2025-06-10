import { Application } from 'src/modules/applications/entities/application.entity';
import { Major } from 'src/modules/majors/entities/major.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Major, major => major.school)
  majors: Major[];

  @OneToMany(() => Application, application => application.school)
  applications: Application[];
}
