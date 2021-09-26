import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Necessidade } from './Necessidade';
import { Lancamento } from './Lancamento';

@Entity()
export class ConectaNecessidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    valorConectaNecessidade: number;

    // Foreign Keys
    
    @ManyToOne(type => Necessidade, necessidade => necessidade.conectadosLancamento)
    necessidadeAssociada: Necessidade

    @ManyToOne(type => Lancamento, lancamento => lancamento.conectadosNecessidade)
    lancamentoAssociado: Lancamento
}