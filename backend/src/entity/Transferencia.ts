import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Conta } from './Conta';

@Entity()
export class Transferencia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricaoTransferencia: string;

    @Column()
    valorTransferencia: number;

    @Column()
    dataTransferencia: Date;

    // Foreign Key
       
    @ManyToOne(type => Conta, conta => conta.transferenciasEnviadas)
    contaOrigem: Conta

    @ManyToOne(type => Conta, conta => conta.transferenciasRecebidas)
    contaDestino: Conta
}