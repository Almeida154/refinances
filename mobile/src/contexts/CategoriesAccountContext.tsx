import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import { UseAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { ToastAndroid } from 'react-native';

export type CategoriaConta = {    
    descricaoCategoryConta: string,
    iconeCategoryConta: string,
    userCategoryConta: number,
    id: number
}

interface CategoriaContaContextType {        
    categoriasConta: CategoriaConta[],
    handleAdicionarCategoriaConta(categoriaProps: CategoriaConta): Promise<void>
    setupCategoriasConta(idUser: number): Promise<void>
    handleReadByUserCategoriesAccount(idUser: number): Promise<void>
}

const CategoriaContaContext = createContext<CategoriaContaContextType>({} as CategoriaContaContextType);

export const UseCategoriasConta = () => useContext(CategoriaContaContext);

export const CategoriasContaProvider: React.FC = ({ children }) => {
    const [categoriasConta, setCategoriasConta] = useState<CategoriaConta[]>([{}] as CategoriaConta[]);

    async function setupCategoriasConta(idUser: number){        
        const nomesCategoriasContaPadroes = [["Carteira", "Entypo:wallet"], ["Poupança", "MaterialCommunityIcons:currency-usd-circle", ], ["Investimentos", "MaterialIcons:show-chart"]];
        const newCategoriasConta = categoriasConta;

        nomesCategoriasContaPadroes.map(async item => {
            const response = await api.post('/categoryAccount/create', {
                descricaoCategoryConta: item[0],
                iconeCategoryConta: item[1],
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
            const response = await api.post('/categoryAccount/create', {
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
    
    async function handleReadByUserCategoriesAccount(idUser: number) {
        try {
            const response = await api.post(`/categoryaccount/findbyuser/${idUser}`)

            if(response.data.error) {
                return ToastAndroid.show(response.data.error, ToastAndroid.SHORT)
            }

            setCategoriasConta(response.data.categoriesConta)
        } catch (error) {
            console.log("Ocorreu um erro no handleReadByUserCategoriesAccount", error)
        }
    }
    return (
        <CategoriaContaContext.Provider value={{ handleReadByUserCategoriesAccount, categoriasConta, handleAdicionarCategoriaConta, setupCategoriasConta }}>
            {children}
        </CategoriaContaContext.Provider>
    );
}