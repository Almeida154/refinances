import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";
import { Transferencia } from "./Transferencia";
import { Parcela } from "./Parcela";

@Entity()
export class Conta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "float",
  })
  saldoConta: number;

  @Column()
  descricao: string;

  @Column()
  tipo: string;

  @Column({ nullable: true })
  instituicao: string;

  // Foreign Keys

  @ManyToOne((type) => User, (user) => user.categoriesUser)
  userConta: User;

  @OneToMany(
    (type) => Transferencia,
    (transferencia) => transferencia.contaDestino
  )
  transferenciasRecebidas: Transferencia[];

  @OneToMany(
    (type) => Transferencia,
    (transferencia) => transferencia.contaOrigem
  )
  transferenciasEnviadas: Transferencia[];

  @OneToMany((type) => Parcela, (parcela) => parcela.contaParcela)
  parcelasConta: Parcela[];
}
