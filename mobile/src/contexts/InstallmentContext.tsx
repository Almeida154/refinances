import React, { createContext, useContext, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';

import retornarIdDoUsuario from '../helpers/retornarIdDoUsuario'

import {toDate} from '../helpers/manipularDatas'

import api from '../services/api'
import { Conta } from './AccountContext';

import {Lancamento} from './EntriesContext'

export type Parcela = {
    id: number,
    dataParcela: Date,
    valorParcela: number,
    contaParcela: Conta | null
    lancamentoParcela: number | Lancamento,
    statusParcela: boolean
}

export type ReadParcela = {
    id: number,
    dataParcela: string,
    valorParcela: number,
    contaParcela: Conta
    lancamentoParcela: Lancamento,
    statusParcela: boolean,
    indexOfLancamento: number,
    totalParcelas: number
}

interface ParcelaContextType {        
    parcelas: Parcela[] | null,
    readParcelas: ReadParcela[][] | null,

    loadingParcela: boolean,
    handleAdicionarParcela(parcelas: Parcela[]): Promise<string>,
    handleInstallmentGroupByDate(idUser: number, rawDate: string): Promise<void>,
}

const ParcelasContext = createContext<ParcelaContextType>({} as ParcelaContextType);
export const UseParcelas = () => useContext(ParcelasContext);

export const ParcelaProvider: React.FC = ({ children }) => {
    const [parcelas, setParcelas] = useState<Parcela[] | null>(null)
    const [readParcelas, setReadParcelas] = useState<ReadParcela[][] | null>(null)
    
    const [loadingParcela, setLoadingParcela] = useState(false)

    async function handleAdicionarParcela(parcelasProps: Parcela[]) {
        
        try {
            const arrayParcelas: Parcela[] = parcelasProps;

            parcelasProps.map(async item => {
                const response = await api.post('/installment/create', {
                    dataParcela: item.dataParcela,
                    valorParcela: item.valorParcela,
                    contaParcela: item.contaParcela?.id,
                    lancamentoParcela: item.lancamentoParcela,
                    statusParcela: item.statusParcela
                });

                if(response.data.error) {
                    return response.data.error
                };
                
                const newParcela = response.data.message                
                console.log("response.data.message | parcelasy", response.data.message)                

                if(readParcelas) {
                    const [dayRead, monthRead, yearRead] = new Date(readParcelas[0][0].dataParcela).toLocaleDateString().split('/')
                    const [day, month, year] = new Date(newParcela.dataParcela).toLocaleDateString().split('/')
                    
                    if(month == month && year == yearRead) {
                        await handleInstallmentGroupByDate(await retornarIdDoUsuario(), new Date(newParcela.dataParcela).toISOString())
                    }
                }
            })

        } catch (error) {
            console.log("Deu um erro ao adicionar a parcela: ", error);
        }
        return ''
    }

    async function handleInstallmentGroupByDate(idUser: number, rawDate: string) {
        try {
            const response = await api.post(`/installment/groupbydate/${idUser}`, {
                rawDate
            })


            if(response.data.error) {
                ToastAndroid.show(response.data.error, ToastAndroid.SHORT)
            }
            
            setReadParcelas(response.data.message)

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