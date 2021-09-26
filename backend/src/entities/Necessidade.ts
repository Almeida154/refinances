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
import { ConectaNecessidade } from './ConectaNecessidade';

@Entity()
export class Necessidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricaoNecessidade: string;

    @Column()
    valorNecessidade: number;
  
    // Foreign Keys

    @ManyToOne(type => User, user => user.categoriesUser)
    userNecessidade: User

    @OneToMany(type => ConectaNecessidade, conectaNecessidade => conectaNecessidade.necessidadeAssociada)
    conectadosLancamento: ConectaNecessidade[]

}