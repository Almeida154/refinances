import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad
} from "typeorm";

import { Category } from "./Category";
import { Meta } from "./Meta";
import { Conta } from "./Conta";
import { Necessidade } from "./Necessidade";

import bcrypt from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeUsuario: string;

    @Column()
    emailUsuario: string;

    @Column()
    senhaUsuario: string;
    
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.senhaUsuario = bcrypt.hashSync(this.senhaUsuario, 8);
    }

    @Column("blob", { nullable: true})
    fotoPerfilUsuario: Buffer;
    
    // Foreign Keys

    @OneToMany(type => Category, category => category.userCategory)
    categoriesUser: Category[];

    @OneToMany(type => Meta, meta => meta.userMeta)
    metasUser: Meta[];

    @OneToMany(type => Conta, conta => conta.userConta)
    contasUser: Conta[];
    
    @OneToMany(type => Necessidade, necessidade => necessidade.userNecessidade)
    necessidadesUsuario: Necessidade[];
}