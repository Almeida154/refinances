import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { User } from './User';

@Entity()
export class Meta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descMeta: string;

    @Column()
    saldoAtualMeta: number;

    @Column()
    saldoMeta: number;

    @Column()
    despesasAtualMeta: number;

    @Column()
    previsao: Date;

    @Column()
    realizacaoMeta: boolean;

    // Foreign Key
    
    @ManyToOne(type => User, user => user.metasUser)
    userMeta: User
}