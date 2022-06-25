import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import Category from './Category';
import User from './User';

@Entity()
class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  cost: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  publicDate: string;

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn({ select: false })
  created: Date;

  @UpdateDateColumn({ select: false })
  updated: Date;

  @DeleteDateColumn({ select: false })
  deleted: Date;

  @Column({ default: false })
  isVisible: boolean;

  @ManyToOne(() => User, (user) => user.ads)
  user: User;

  @ManyToMany(() => Category, (category) => category.ads)
  @JoinTable()
  categories: Category[];
}

export default Ad;
