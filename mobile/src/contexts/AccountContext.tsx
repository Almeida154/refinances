import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseAuth } from './AuthContext';

export type Conta = {
    id: number,
    saldoConta: number,
    descricao: string,
    userConta: number,
    categoryConta: string,
}

interface ContaContextType {        
    contas: Conta[]
    loading: boolean
    handleAdicionarConta(contaProps: Conta): Promise<void>    
    handleReadByUserContas(idUser: number): Promise<void>
}

const ContaContext = createContext<ContaContextType>({} as ContaContextType);

export const UseContas = () => useContext(ContaContext);

export const ContasProvider: React.FC = ({ children }) => {
    const [contas, setContas] = useState<Conta[]>([{}] as Conta[]);
    const [loading, setLoading] = useState(false)

    async function handleAdicionarConta(conta: Conta) {
        console.log(conta.userConta);
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

            if(response.data.error) console.log(response.data.error);

            console.log('response.data', response.data)
            await AsyncStorage.setItem('idConta', String(response.data.message.id));

            const newContas = contas;
            newContas.push(response.data.message);

            setContas(newContas);

        } catch (error) {
            console.log("Deu um erro no handleAdicionarConta: " + error);
        }
    }
    
    async function handleReadByUserContas(idUser: number) {
        console.log('foia qui')
        setLoading(true)
        try {
            const response = await api.post(`/account/findbyuser/${idUser}`)
                
            
            
            setContas(response.data.contas)
            
            setLoading(false)

            console.log('contas: ' + contas)
        } catch (error) {
            
        }
    }

    return (
        <ContaContext.Provider value={{ contas, handleReadByUserContas, loading, handleAdicionarConta }}>
            {children}
        </ContaContext.Provider>
    )
}