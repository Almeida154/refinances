import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Category } from "./Category";
import { Meta } from "./Meta";
import { Conta } from "./Conta";
import { Parcela } from "./Parcela";
import { Necessidade } from "./Necessidade";

import bcrypt from "bcryptjs";
import { Lancamento } from "./Lancamento";
import { Transferencia } from "./Transferencia";
import { Config } from "./Config";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeUsuario: string;

  @Column()
  emailUsuario: string;

  @Column()
  senhaUsuario: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.senhaUsuario = bcrypt.hashSync(this.senhaUsuario, 8);
  }

  @Column("longblob", { nullable: true }) //mediumblob = 16mb
  fotoPerfilUsuario: Buffer;

  // Foreign Keys

  @OneToMany((type) => Category, (category) => category.userCategory)
  categoriesUser: Category[];

  @OneToMany((type) => Parcela, (Parcela) => Parcela.userParcela)
  parcelasUser: Parcela[];

  @OneToMany((type) => Meta, (meta) => meta.userMeta)
  metasUser: Meta[];

  @OneToMany((type) => Conta, (conta) => conta.userConta)
  contasUser: Conta[];

  @OneToMany((type) => Lancamento, (lancamento) => lancamento.userLancamento)
  lancamentosUser: Lancamento[];

  @OneToMany(
    (type) => Necessidade,
    (necessidade) => necessidade.userNecessidade
  )
  necessidadesUsuario: Necessidade[];

  @OneToMany(
    (type) => Transferencia,
    (transferencia) => transferencia.userTransferencia
  )
  transferenciasUser: Transferencia[];

  @OneToOne((type) => Config,config => config.userConfig)
  @JoinColumn()
  configUser: Config
}
