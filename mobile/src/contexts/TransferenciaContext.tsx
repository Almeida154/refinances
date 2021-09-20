import React, { createContext, useContext, useEffect, useState } from 'react'

import api from '../services/api'

export type Transferencia = {
    id: number,
    descricaoTransferencia: string,
    valorTransferencia: number,
    contaOrigemTransferencia: number,
    contaDestinoTransferencia: number,
    dateTransferencia: string,
}

interface TransferenciaContextType {        
    transferencias: Transferencia[] ,
    handleAdicionarTransferencia(transferencias: Transferencia[]): Promise<void>,
}

const TransferenciasContext = createContext<TransferenciaContextType>({} as TransferenciaContextType);
export const UseTransferencias = () => useContext(TransferenciasContext);

export const TransferenciaProvider: React.FC = ({ children }) => {
    const [transferencias, setTransferencias] = useState<Transferencia[]>([{}] as Transferencia[])

    async function handleAdicionarTransferencia(TransferenciasProps: Transferencia[]) {
        
        try {
            

           

            
            
        } catch (error) {
            console.log("Deu um erro ao adicionar a Transferencia: ", error);
        }
    }    
    
    return (
        <TransferenciasContext.Provider value={{ transferencias, handleAdicionarTransferencia }}>
            {children}
        </TransferenciasContext.Provider>
    );
}