import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Category } from './Category';
import { Conta } from './Conta';
import { Lancamento } from './Lancamento';

@Entity()
export class Parcela {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dataParcela: string;

    @Column()
    valorParcela: number;
   
    // Foreign Keys
    
    @ManyToOne(type => Conta, conta => conta.parcelasConta)
    contaParcela: Conta

    @ManyToOne(type => Lancamento, lancamento => lancamento.parcelasLancamento)
    lancamentoParcela: Lancamento
}