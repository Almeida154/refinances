import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Category } from "./Category";
import { ConectaNecessidade } from "./ConectaNecessidade";
import { Meta } from "./Meta";
import { Parcela } from "./Parcela";
import { User } from "./User";

@Entity()
export class Lancamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricaoLancamento: string;

  @Column()
  tipoLancamento: string;

  @Column()
  lugarLancamento: string;

  @Column()
  essencial: boolean;

  @Column()
  parcelaBaseada: number; //Se o gasto não é mensal , então o valor é -1, se é mensal, o número será o indice da parcela que servira de base para as futuras

  // Foreign Keys

  @ManyToOne((type) => Category, (category) => category.lancamentosCategory)
  categoryLancamento: Category;

  @ManyToOne((type) => User, (user) => user.lancamentosUser)
  userLancamento: User;

  @OneToMany((type) => Parcela, (parcela) => parcela.lancamentoParcela)
  parcelasLancamento: Parcela[];

  @OneToOne((type) => Meta, (meta) => meta.lancamentoMeta)
  metaLancamento: Meta;

  @OneToMany(
    (type) => ConectaNecessidade,
    (conectaNecessidade) => conectaNecessidade.lancamentoAssociado
  )
  conectadosNecessidade: ConectaNecessidade[];
}
