import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UseAuth } from './AuthContext';

export type Categoria = {
    id: number,
    nomeCategoria: string,
    tetoDeGastos: number,
    tipoCategoria: string,
    essencial: boolean,    
    userCategoria: number
}

interface CategoriaContextType {        
    categorias: Categoria[] ,

    handleAdicionar(categoriaProps: Categoria): Promise<void>
    setupCategorias(): Promise<void>
}

const CategoriaContext = createContext<CategoriaContextType>({} as CategoriaContextType);

export const UseCategorias = () => useContext(CategoriaContext);

export const CategoriasProvider: React.FC = ({ children }) => {
    const [categorias, setCategorias] = useState<Categoria[]>([{}] as Categoria[]);
    const { user } = UseAuth();

    async function setupCategorias(){
        console.log("Foi aqui");

        const nomesCategoriasPadroes = [
            "Educação", "Casa",
            "Restaurantes", "Família",
            "Impostos", "Lazer",
            "Mercado", "Pets",
            "Transporte", "Viagem"
        ];

        const newCategorias = categorias;

        nomesCategoriasPadroes.map(async item => {
            const response = await api.post('/category/create', {
                nomeCategoria: item,
                tetoDeGastos: null,
                tipoCategoria: "despesa",
                essencial: false,
                userCategory: user.id
            });

            newCategorias.push(response.data.message);
        })

        setCategorias(newCategorias);
    }

    async function handleAdicionar(categoria: Categoria) {
        
        try {                     
            const response = await api.post('/category/create', {
                nomeCategoria: categoria.nomeCategoria,
                tetoDeGastos: categoria.tetoDeGastos,
                tipoCategoria: categoria.tipoCategoria,
                essencial: categoria.essencial,
                userCategory: categoria.userCategoria
            });

            if (response.data.error) {
                console.log(response.data.error);
            }

            const newCategorias: Categoria[] = categorias
            newCategorias.push(response.data.message);

            setCategorias(newCategorias);

        } catch (error) {
            console.log("Deu um erro no handleAdicionar: " + error);
        }
    }
    

    return (
        <CategoriaContext.Provider value={{ categorias, handleAdicionar, setupCategorias }}>
            {children}
        </CategoriaContext.Provider>
    );
}