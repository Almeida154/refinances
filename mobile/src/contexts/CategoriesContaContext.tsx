import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import { UseAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';

export type CategoriaConta = {    
    descricaoCategoryConta: string,
    iconeCategoryConta: Buffer | null,
    userCategoryConta: number,
    id: number
}

interface CategoriaContaContextType {        
    categoriasConta: CategoriaConta[],
    handleAdicionarCategoriaConta(categoriaProps: CategoriaConta): Promise<void>
    setupCategoriasConta(idUser: number): Promise<void>
}

const CategoriaContaContext = createContext<CategoriaContaContextType>({} as CategoriaContaContextType);

export const UseCategoriasConta = () => useContext(CategoriaContaContext);

export const CategoriasContaProvider: React.FC = ({ children }) => {
    const [categoriasConta, setCategoriasConta] = useState<CategoriaConta[]>([{}] as CategoriaConta[]);

    async function setupCategoriasConta(idUser: number){        
        const nomesCategoriasContaPadroes = ["Carteira", "Poupança", "Investimentos"];
        const newCategoriasConta = categoriasConta;

        nomesCategoriasContaPadroes.map(async item => {
            const response = await api.post('/categoryconta/create', {
                descricaoCategoryConta: item,
                iconeCategoryConta: null,
                userCategoryConta: idUser
            });

            newCategoriasConta.push(response.data.message);
        })
        
        console.log(newCategoriasConta);
        setCategoriasConta(newCategoriasConta);
    }

    async function handleAdicionarCategoriaConta(categoriaConta: CategoriaConta) {
        console.log(categoriaConta.iconeCategoryConta);
        try {                     
            const response = await api.post('/categoryconta/create', {
                descricaoCategoryConta: categoriaConta.descricaoCategoryConta,
                iconeCategoryConta: categoriaConta.iconeCategoryConta,
                userCategoryConta: categoriaConta.userCategoryConta
            });

            console.log(response.data);
            const newCategoriasConta: CategoriaConta[] = categoriasConta;
            newCategoriasConta.push(response.data.message);

            setCategoriasConta(newCategoriasConta);

        } catch (error) {
            console.log("Deu um erro no handleAdicionarCategoriaConta: " + error);
        }
    }
    
    return (
        <CategoriaContaContext.Provider value={{ categoriasConta, handleAdicionarCategoriaConta, setupCategoriasConta }}>
            {children}
        </CategoriaContaContext.Provider>
    );
}