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
import { Conta } from './Conta';

@Entity()
export class CategoryConta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricaoCategoryConta: string;

    @Column()
    corCategoryConta: string;

    @Column()
    iconeCategoryConta: string;

    // Foreign Keys
    
    @ManyToOne(type => User, user => user.categoriesUser)
    userCategoryConta: User

    @OneToMany(type => User, user => user.categoriesUser)
    contasCategoryConta: Conta[]
   
}