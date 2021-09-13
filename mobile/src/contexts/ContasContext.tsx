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
    contas: Conta[],
    handleAdicionarConta(contaProps: Conta): Promise<void>    
}

const ContaContext = createContext<ContaContextType>({} as ContaContextType);

export const UseContas = () => useContext(ContaContext);

export const ContasProvider: React.FC = ({ children }) => {
    const [contas, setContas] = useState<Conta[]>({} as Conta[]);

    async function handleAdicionarConta(conta: Conta) {
        console.log(conta.userConta);
        try {                    
            const responseCategoryConta = await api.post(`/categoryconta/findbyname/${conta.userConta}`, {
                descricaoCategoriaConta: conta.categoryConta
            });

            console.log(responseCategoryConta.data);

            const response = await api.post('/conta/create', {
                saldoConta: conta.saldoConta,
                descricao: conta.descricao,
                userConta: conta.userConta,
                categoryConta: responseCategoryConta.data.idCategoryConta,
            });

            if(response.data.error) console.log(response.data.error);

            await AsyncStorage.setItem('idConta', String(response.data.message.id));

            const newContas = contas;
            newContas.push(response.data.message);

            setContas(newContas);

        } catch (error) {
            console.log("Deu um erro no handleAdicionarConta: " + error);
        }
    }
    

    return (
        <ContaContext.Provider value={{ contas, handleAdicionarConta }}>
            {children}
        </ContaContext.Provider>
    )
}