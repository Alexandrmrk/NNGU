import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Role from './Role';
import Session from './Session';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @CreateDateColumn({ select: false })
  created: Date;

  @UpdateDateColumn({ select: false })
  updated: Date;

  @DeleteDateColumn({ select: false })
  deleted: Date;

  /* Relations */

  @OneToOne(() => Role, (role) => role.user)
  @JoinColumn()
  role: Role;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}

export default User;
