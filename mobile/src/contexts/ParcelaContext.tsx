import React, { createContext, useContext, useEffect, useState } from 'react'

import api from '../services/api'

export type Parcela = {
    id: number,
    dateParcela: string,
    valorParcela: number,
    contaParcela: number
    lancamentoParcela: number
}

interface ParcelaContextType {        
    parcelas: Parcela[] ,
    handleAdicionarParcela(parcelas: Parcela[]): Promise<void>,
}

const ParcelasContext = createContext<ParcelaContextType>({} as ParcelaContextType);
export const UseParcelas = () => useContext(ParcelasContext);

export const ParcelaProvider: React.FC = ({ children }) => {
    const [parcelas, setParcelas] = useState<Parcela[]>([{}] as Parcela[])

    async function handleAdicionarParcela(parcelasProps: Parcela[]) {
        console.log('foi bem aqui');
        try {
            const arrayParcelas: Parcela[] = parcelas;

            parcelasProps.map(async item => {
                const response = await api.post('/parcela/create', {
                    dataParcela: item.dateParcela,
                    valorParcela: item.valorParcela,
                    contaParcela: item.contaParcela,
                    lancamentoParcela: item.lancamentoParcela
                });

                if(response.data.error) {
                    throw response.data.error
                };

                console.log('response.data.message');
                console.log(response.data.message);
                arrayParcelas.push(response.data.message);
            })

            setParcelas(arrayParcelas);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <ParcelasContext.Provider value={{ parcelas, handleAdicionarParcela }}>
            {children}
        </ParcelasContext.Provider>
    );
}