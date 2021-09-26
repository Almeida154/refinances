import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { User } from './User';
import { Lancamento } from './Lancamento';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 200})
    nomeCategoria: string;

    @Column({nullable: true})
    tetoDeGastos: number;    

    @Column()
    tipoCategoria: string;

    @Column()
    essencial: boolean;

    // Foreign Keys
    
    @ManyToOne(type => User, user => user.categoriesUser)
    userCategory: User

    @OneToMany(type => Lancamento, lancamento => lancamento.categoryLancamento)
    lancamentosCategory: Lancamento[]
}