import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseAuth } from './AuthContext';

import { Parcela, UseParcelas } from './ParcelaContext';

export type Lancamento = {
    id: number,
    descricaoLancamento: string,
    tipoLancamento: string,
    lugarLancamento: string,
    categoryLancamento: string,    

    parcelas: Parcela[];
}

interface LancamentoContextType {        
    lancamentos: Lancamento[],
    handleLoadLancamentos(idUser: number): Promise<void>
    handleAdicionarLancamento(lancamentoProps: Lancamento, idUser: number ): Promise<void>
}

const LancamentoContext = createContext<LancamentoContextType>({} as LancamentoContextType)

export const UseLancamentos = () => useContext(LancamentoContext);

export const LancamentoProvider: React.FC = ({ children }) => {
    const [lancamentos, setLancamentos] = useState<Lancamento[]>([{}] as Lancamento[]);
    const { handleAdicionarParcela } = UseParcelas();    
    
    async function handleLoadLancamentos(idUser: number) {

    }

    async function handleAdicionarLancamento(lancamento: Lancamento, idUser: number) {
        
        try {
            const responseCategory = await api.post(`/category/findbyname/${idUser}`, {
                nomeCategoria: lancamento.categoryLancamento
            });

            const response = await api.post('/lancamento/create', {
                descricaoLancamento: lancamento.descricaoLancamento,
                tipoLancamento: lancamento.tipoLancamento,
                lugarLancamento: lancamento.lugarLancamento,
                categoryLancamento: responseCategory.data.idCategory
            });

            if(response.data.error) throw response.data.error

            lancamento.parcelas.map((item, index) => {
                lancamento.parcelas[index] = lancamento.parcelas[index].lancamentoParcela == -1 ? response.data.message.id : lancamento.parcelas[index].lancamentoParcela
            })            
            
            handleAdicionarParcela(lancamento.parcelas);
            const newLancamentos: Lancamento[] = lancamentos
            newLancamentos.push(response.data.message);
            setLancamentos(newLancamentos);
            
        } catch (error) {
            console.log("Deu um erro no handleAdicionarLancamento: " + error);
        }
    }
    
    return (
        <LancamentoContext.Provider value={{ handleLoadLancamentos, lancamentos, handleAdicionarLancamento }}>
            {children}
        </LancamentoContext.Provider>
    );
}