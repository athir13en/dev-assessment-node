import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  email: string;

  @Column()
  status: boolean;

  @ManyToMany(() => Teacher, (teacher) => teacher.students)
  teachers: Teacher[];
}
