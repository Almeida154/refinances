import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Category } from './Category';
import { ConectaNecessidade } from './ConectaNecessidade';
import { Parcela } from './Parcela';

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
   
    // Foreign Keys
    
    @ManyToOne(type => Category, category => category.lancamentosCategory)
    categoryLancamento: Category

    @OneToMany(type => Parcela, parcela => parcela.lancamentoParcela)
    parcelasLancamento: Parcela[]

    @OneToMany(type => ConectaNecessidade, conectaNecessidade => conectaNecessidade.lancamentoAssociado)
    conectadosNecessidade: ConectaNecessidade[]
}