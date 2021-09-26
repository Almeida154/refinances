import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Conta } from './Conta';
import { User } from './User';

@Entity()
export class Transferencia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricaoTransferencia: string;

    @Column({
        type: 'float'
    })
    valorTransferencia: number;

    @Column()
    dataTransferencia: string;

    // Foreign Key
       
    @ManyToOne(type => User, user => user.transferenciasUser)
    userTransferencia: User;

    @ManyToOne(type => Conta, conta => conta.transferenciasEnviadas)
    contaOrigem: Conta

    @ManyToOne(type => Conta, conta => conta.transferenciasRecebidas)
    contaDestino: Conta
}