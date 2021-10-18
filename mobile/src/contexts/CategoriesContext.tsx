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
    userCategoria: number,
    iconeCategoria: string
}

interface CategoriaContextType {        
    categorias: Categoria[] | null
    loading: boolean

    handleAdicionar(categoriaProps: Categoria): Promise<string>
    setupCategorias(): Promise<void>
    handleReadByUserCategorias(idUser: number, tipoCategoria: string): Promise<void>
}

const CategoriaContext = createContext<CategoriaContextType>({} as CategoriaContextType);

export const UseCategories = () => useContext(CategoriaContext);

export const CategoriasProvider: React.FC = ({ children }) => {
    const [categorias, setCategorias] = useState<Categoria[] | null>(null);    
    const [loading, setLoading] = useState(false)

    const { user } = UseAuth();

    async function setupCategorias(){        
        const nomesCategoriasPadroes = [
            ["Educação", "FontAwesome:book"], ["Casa", "MaterialCommunityIcons:home-variant"],
            ["Restaurantes", "Ionicons:restaurant-sharp"], ["Família", "MaterialIcons:family-restroom"],
            ["Impostos", "FontAwesome5:file-invoice-dollar"], ["Lazer", "MaterialIcons:park"],
            ["Mercado", "MaterialCommunityIcons:point-of-sale"], ["Pets", "MaterialIcons:pets"],
            ["Transporte", "FontAwesome5:car-side"], ["Viagem", "Fontisto:plane"]
        ];        

        const newCategorias = categorias;

        nomesCategoriasPadroes.map(async item => {
            const response = await api.post('/category/create', {
                nomeCategoria: item[0],
                tetoDeGastos: null,
                tipoCategoria: "despesa",
                essencial: false,
                iconeCategoria: item[1],
                userCategory: user.id
            });

            if(newCategorias == null) {
                setCategorias([response.data.message])
            } else {
                newCategorias.push(response.data.message);
            }
        })

        setCategorias(newCategorias);
    }

    async function handleAdicionar(categoria: Categoria) {
        setLoading(true)
        console.log('veio aqui no handleAdicionar')
        try {                     
            const response = await api.post('/category/create', {
                nomeCategoria: categoria.nomeCategoria,
                tetoDeGastos: categoria.tetoDeGastos,
                tipoCategoria: categoria.tipoCategoria,
                essencial: categoria.essencial,
                iconeCategoria: categoria.iconeCategoria,
                userCategory: categoria.userCategoria
            });


            if (response.data.error) {                
                return response.data.error
            }

            const newCategorias = categorias

            if(newCategorias == null) {
                setCategorias([response.data.message])
            } else {
                newCategorias.push(response.data.message);
                setCategorias(newCategorias);
            }
            setLoading(false)

            return ''
        } catch (error) {
            console.log("Deu um erro no handleAdicionar: " + error);
        }
    }

    async function handleReadByUserCategorias(idUser: number, tipoCategoria: string) {
        console.log('foia qui')
        setLoading(true)
        try {
            const response = await api.post(`/category/findbyuser/${idUser}`, {
                tipoCategoria
            })
            setCategorias(response.data.categories)
            setLoading(false)
        } catch (error) {
            
        }
    }
    

    return (
        <CategoriaContext.Provider value={{ categorias, loading, handleReadByUserCategorias, handleAdicionar, setupCategorias }}>
            {children}
        </CategoriaContext.Provider>
    );
}