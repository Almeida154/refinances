import React, { createContext, useContext, useEffect, useState } from 'react'
import { Alert, ToastAndroid } from 'react-native';
import retornarIdDoUsuario from '../helpers/retornarIdDoUsuario';

import api from '../services/api'

import {Conta} from './AccountContext'

export type Transferencia = {
    id: number,
    descricaoTransferencia: string,
    valorTransferencia: number,
    contaOrigem: Conta,
    contaDestino: Conta,
    dataTransferencia: Date,
}

interface TransferenciaContextType {        
    transferencias: Transferencia[] | null ,
    readTransferencias: Transferencia[][] | null

    loadingTransferencia: boolean,
    handleAdicionarTransferencia(transferencia: Transferencia): Promise<string>,
    handleLoadTransferencias(idUser: number): Promise<void>
    handleTransferGroupByDate(idUser: number, rawDate: string): Promise<void>
}

const TransferenciasContext = createContext<TransferenciaContextType>({} as TransferenciaContextType);
export const UseTransferencias = () => useContext(TransferenciasContext);

export const TransferenciaProvider: React.FC = ({ children }) => {
    const [transferencias, setTransferencias] = useState<Transferencia[] | null>(null)
    const [readTransferencias, setReadTransferencias] = useState<Transferencia[][] | null>(null)

    const [loadingTransferencia, setLoadingTransferencia] = useState(false)

    async function handleAdicionarTransferencia(TransferenciaProps: Transferencia) {       
        
        try {
            const response = await api.post('transfer/create', {
                descricaoTransferencia: TransferenciaProps.descricaoTransferencia,
                valorTransferencia: TransferenciaProps.valorTransferencia,
                contaOrigem: TransferenciaProps.contaOrigem?.id,
                contaDestino: TransferenciaProps.contaDestino?.id,
                dataTransferencia: TransferenciaProps.dataTransferencia
            })
            
            const newTransferencia: Transferencia = response.data.message
                        

            if(response.data.error) {                
                return response.data.error
            }

            if(readTransferencias) {
                const [dayRead, monthRead, yearRead] = new Date(readTransferencias[0][0].dataTransferencia).toLocaleDateString().split('/')
                const [day, month, year] = new Date(newTransferencia.dataTransferencia).toLocaleDateString().split('/')
                
                if(month == month && year == yearRead) {
                    await handleTransferGroupByDate(await retornarIdDoUsuario(), new Date(newTransferencia.dataTransferencia).toISOString())
                }
            }

            return ''
 
        } catch (error) {
            console.log("Deu um erro ao adicionar a Transferencia: ", error);
        }
    }    

    async function handleTransferGroupByDate(idUser: number, rawDate: string) {
        setLoadingTransferencia(true)
        try {
            const response = await api.post(`/transfer/groupbydate/${idUser}`, {
                rawDate
            })

            if(response.data.error) {
                ToastAndroid.show(response.data.error, ToastAndroid.SHORT)
            }
            
            setReadTransferencias(response.data.message)

            setLoadingTransferencia(false)
        } catch (error) {
            console.log("Deu um erro no handleLoadGroupByDate", error)
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
        <TransferenciasContext.Provider value={{ readTransferencias, handleTransferGroupByDate, transferencias, loadingTransferencia, handleLoadTransferencias, handleAdicionarTransferencia }}>
            {children}
        </TransferenciasContext.Provider>
    );
}