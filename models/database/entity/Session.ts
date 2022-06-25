import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './User';

@Entity()
class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  token: string;

  @CreateDateColumn({ select: false })
  created: Date;

  /* Relations */

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;
}

export default Session;
