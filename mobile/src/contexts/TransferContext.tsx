import React, { createContext, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native';

import api from '../services/api'

import {Conta} from './AccountContext'

export type Transferencia = {
    id: number,
    descricaoTransferencia: string,
    valorTransferencia: number,
    contaOrigem: number | Conta,
    contaDestino: number | Conta,
    dataTransferencia: string,
}

interface TransferenciaContextType {        
    transferencias: Transferencia[] ,
    loadingTransferencia: boolean,

    handleAdicionarTransferencia(transferencia: Transferencia): Promise<string>,
    handleLoadTransferencias(idUser: number): Promise<void>
}

const TransferenciasContext = createContext<TransferenciaContextType>({} as TransferenciaContextType);
export const UseTransferencias = () => useContext(TransferenciasContext);

export const TransferenciaProvider: React.FC = ({ children }) => {
    const [transferencias, setTransferencias] = useState<Transferencia[]>([{}] as Transferencia[])
    const [loadingTransferencia, setLoadingTransferencia] = useState(false)

    async function handleAdicionarTransferencia(TransferenciaProps: Transferencia) {       
        setLoadingTransferencia(true)
        try {
            const response = await api.post('transfer/create', TransferenciaProps)
            
            console.log('response.data: ', response.data)
            const newTransferencia: Transferencia = response.data.message
                        
            setLoadingTransferencia(false)

            if(response.data.error) {                
                return response.data.error
            }

            return ''
 
        } catch (error) {
            console.log("Deu um erro ao adicionar a Transferencia: ", error);
        }
    }    

    async function handleLoadTransferencias(idUser: number) {
        setLoadingTransferencia(true)
        try {
            const response = await api.post(`/transfer/findbyuser/${idUser}`)

            setTransferencias(response.data.transferencias)

            setLoadingTransferencia(false)
        } catch (error) {
            console.log("Deu um erro no handleLoadTransferencias: ", error)
        }
    }
    
    return (
        <TransferenciasContext.Provider value={{ transferencias, loadingTransferencia, handleLoadTransferencias, handleAdicionarTransferencia }}>
            {children}
        </TransferenciasContext.Provider>
    );
}