import React, { createContext, useContext, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';

import api from '../services/api'

import {Lancamento} from './EntriesContext'

export type Parcela = {
    id: number,
    dateParcela: Date,
    valorParcela: number,
    contaParcela: number | null
    lancamentoParcela: number | Lancamento,
    statusParcela: boolean
}

interface ParcelaContextType {        
    parcelas: Parcela[] | null,
    readParcelas: Parcela[][] | null,

    loadingParcela: boolean,
    handleAdicionarParcela(parcelas: Parcela[]): Promise<void>,
    handleInstallmentGroupByDate(idUser: number, rawDate: string): Promise<void>,
}

const ParcelasContext = createContext<ParcelaContextType>({} as ParcelaContextType);
export const UseParcelas = () => useContext(ParcelasContext);

export const ParcelaProvider: React.FC = ({ children }) => {
    const [parcelas, setParcelas] = useState<Parcela[] | null>(null)
    const [readParcelas, setReadParcelas] = useState<Parcela[][] | null>(null)
    
    const [loadingParcela, setLoadingParcela] = useState(false)

    async function handleAdicionarParcela(parcelasProps: Parcela[]) {
        
        try {
            const arrayParcelas: Parcela[] = parcelasProps;

            parcelasProps.map(async item => {
                console.log("item=>", item)
                const response = await api.post('/installment/create', {
                    dataParcela: item.dateParcela,
                    valorParcela: item.valorParcela,
                    contaParcela: item.contaParcela,
                    lancamentoParcela: item.lancamentoParcela,
                    statusParcela: item.statusParcela
                });

                if(response.data.error) {
                    throw response.data.error
                };
                
                arrayParcelas.push(response.data.message);                
            })

            setParcelas(arrayParcelas);
            
        } catch (error) {
            console.log("Deu um erro ao adicionar a parcela: ", error);
        }
    }

    async function handleInstallmentGroupByDate(idUser: number, rawDate: string) {
        setLoadingParcela(true)
        try {
            const response = await api.post(`/installment/groupbydate/${idUser}`, {
                rawDate
            })

            if(response.data.error) {
                ToastAndroid.show(response.data.error, ToastAndroid.SHORT)
            }
            
            console.debug('response.data.message | parcela', response.data.message)

            setReadParcelas(response.data.message)

            setLoadingParcela(false)
        } catch (error) {
            console.log("Deu um erro no handleLoadGroupByDate", error)
        }
    }

    /*
    async function handleLoadParcelas(idUser: number) {
        
        try {            
            const response = await api.post(`/installment/findbyuser/${idUser}`)
                        
            return response.data.message
        } catch (error) {
            console.log("Deu um erro ao adicionar a parcela: ", error);
        }
    }*/
    
    return (
        <ParcelasContext.Provider value={{ parcelas, readParcelas, handleAdicionarParcela, handleInstallmentGroupByDate, loadingParcela }}>
            {children}
        </ParcelasContext.Provider>
    );
}