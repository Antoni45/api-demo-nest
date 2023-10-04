import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  prenom: string;

  @Column({ nullable: true })
  tel: string;

  @Column()
  adresse: string;

  @Column({ nullable: true })
  genre: string;

  @Column()
  ville: string;

  @Column()
  pays: string;

  @Column()
  nationalite: string;

  @Column({ nullable: true })
  photo: string;
}
