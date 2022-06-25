import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  title: string;

  /* Relations */

  @OneToOne(() => User, (user) => user.role)
  user: User;
}

export default Role;
