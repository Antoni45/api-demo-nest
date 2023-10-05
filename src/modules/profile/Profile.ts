import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/User';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  nom: string;

  @Column({ nullable: true })
  prenom: string;

  @Column({ nullable: true })
  tel: string;

  @IsNotEmpty()
  @Column()
  adresse: string;

  @Column({ nullable: true })
  genre: string;

  @IsNotEmpty()
  @Column()
  ville: string;

  @IsNotEmpty()
  @Column()
  pays: string;

  @IsNotEmpty()
  @Column()
  nationalite: string;

  @Column({ nullable: true })
  photo: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
