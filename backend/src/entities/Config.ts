import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";

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

  @OneToOne((type) => User, (user) => user.configUser)
  userConfig: User;
}
