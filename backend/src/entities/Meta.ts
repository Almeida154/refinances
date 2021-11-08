import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lancamento } from "./Lancamento";

import { User } from "./User";

@Entity()
export class Meta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descMeta: string;

  @Column({
    type: "float",
  })
  saldoFinalMeta: number;

  @Column({
    type: "float",
  })
  saldoAtualMeta: number;

  @Column()
  dataInicioMeta: string;

  @Column()
  dataFimMeta: string;

  @Column()
  realizacaoMeta: boolean;

  // Foreign Key

  @ManyToOne((type) => User, (user) => user.metasUser)
  userMeta: User;

  @OneToOne((type) => Lancamento, (lancamento) => lancamento.metaLancamento)
  lancamentoMeta: Lancamento;
}
