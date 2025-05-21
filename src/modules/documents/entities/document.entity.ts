import { Application } from 'src/modules/applications/entities/application.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


export enum FileType {
  PDF = 'pdf',
  JPEG = 'jpeg',
  PNG = 'png',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Application, (app) => app.documents)
  application: Application;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

  @Column({ type: 'enum', enum: FileType })
  fileType: FileType;
}
