import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Ad from './Ad';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Ad, (ad) => ad.user)
  ads: Ad[];
}

export default User;
