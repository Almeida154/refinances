import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "./User";

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fingerprint: boolean;

  @Column()
  theme: string;

  @Column({ nullable: true })
  senha: string;

  @Column()
  idioma: string;

  @ManyToOne((type) => User, (user) => user.id)
  userId: User;
}
