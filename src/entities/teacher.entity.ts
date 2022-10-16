import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  email: string;

  @ManyToMany(() => Student, (student) => student.teachers, { cascade: true })
  @JoinTable()
  students: Student[];
}
