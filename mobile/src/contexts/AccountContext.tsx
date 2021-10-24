import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CategoriaConta } from './CategoriesAccountContext';
import { ToastAndroid } from 'react-native';

export type Conta = {
    id: number,
    saldoConta: number,
    descricao: string,
    userConta: number,
    categoryConta: CategoriaConta | string,
}

interface ContaContextType {        
    contas: Conta[] | null
    loading: boolean
    handleAdicionarConta(contaProps: Conta): Promise<string>    
    handleReadByUserContas(idUser: number): Promise<void>
}

const ContaContext = createContext<ContaContextType>({} as ContaContextType);

export const UseContas = () => useContext(ContaContext);

export const ContasProvider: React.FC = ({ children }) => {
    const [contas, setContas] = useState<Conta[] | null>(null);
    const [loading, setLoading] = useState(false)

    async function handleAdicionarConta(conta: Conta) {
        try {                    
            const responseCategoryConta = await api.post(`/categoryAccount/findbyname/${conta.userConta}`, {
                descricaoCategoriaConta: conta.categoryConta
            });            

            const response = await api.post('/account/create', {
                saldoConta: conta.saldoConta,
                descricao: conta.descricao,
                userConta: conta.userConta,
                categoryConta: responseCategoryConta.data.idCategoryConta,
            });

            if(response.data.error) 
                return response.data.error

            await AsyncStorage.setItem('idConta', String(response.data.message.id));

            if(contas != null) {
                const newContas = contas;                    
                newContas.push(response.data.message);
                setContas(newContas);
            }
            
            return ''
        } catch (error) {
            console.log("Deu um erro no handleAdicionarConta: " + error);
        }
    }
    
    async function handleReadByUserContas(idUser: number) {
        setLoading(true)
        try {
            const response = await api.post(`/account/findbyuser/${idUser}`)
                
            if(response.data.error) {
                ToastAndroid.show(response.data.error, ToastAndroid.SHORT)
            }
            setContas(response.data.contas)
            
            setLoading(false)

        } catch (error) {
            
        }
    }

    return (
        <ContaContext.Provider value={{ contas, handleReadByUserContas, loading, handleAdicionarConta }}>
            {children}
        </ContaContext.Provider>
    )
}