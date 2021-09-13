import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { CategoryConta } from './CategoryConta';
import { User } from './User';
import { Transferencia } from './Transferencia';
import { Parcela } from './Parcela';

@Entity()
export class Conta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    saldoConta: number;

    @Column()
    descricao: string;

    @ManyToOne(type => CategoryConta, categoryConta => categoryConta.contasCategoryConta)
    categoryConta: CategoryConta
    
    // Foreign Keys

    @ManyToOne(type => User, user => user.categoriesUser)
    userConta: User

    @OneToMany(type => Transferencia, transferencia => transferencia.contaDestino)
    transferenciasRecebidas: Transferencia[]

    @OneToMany(type => Transferencia, transferencia => transferencia.contaOrigem)
    transferenciasEnviadas: Transferencia[]
    
    @OneToMany(type => Parcela, parcela => parcela.contaParcela)
    parcelasConta: Parcela[]
}