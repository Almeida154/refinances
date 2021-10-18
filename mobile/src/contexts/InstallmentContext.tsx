import React, { createContext, useContext, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';

import api from '../services/api'

export type Parcela = {
    id: number,
    dateParcela: Date,
    valorParcela: number,
    contaParcela: number | null
    lancamentoParcela: number
}

interface ParcelaContextType {        
    parcelas: Parcela[] ,

    loadingParcela: boolean,
    handleAdicionarParcela(parcelas: Parcela[]): Promise<void>,
    handleInstallmentGroupByDate(idUser: number, rawDate: string): Promise<void>,
}

const ParcelasContext = createContext<ParcelaContextType>({} as ParcelaContextType);
export const UseParcelas = () => useContext(ParcelasContext);

export const ParcelaProvider: React.FC = ({ children }) => {
    const [parcelas, setParcelas] = useState<Parcela[]>([{}] as Parcela[])
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
                    lancamentoParcela: item.lancamentoParcela
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
            
            setParcelas(response.data.message)

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
        <ParcelasContext.Provider value={{ parcelas, handleAdicionarParcela, handleInstallmentGroupByDate, loadingParcela }}>
            {children}
        </ParcelasContext.Provider>
    );
}