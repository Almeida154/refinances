import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { StackDescriptorMap } from '@react-navigation/stack/lib/typescript/src/types';

export type Meta = {
    id: number,
    descMeta: string,
    saldoFinalMeta: number,
    saldoAtualMeta: number,
    dataInicioMeta: string, 
    dataFimMeta: string,
    realizacaoMeta: boolean,
    userMetaId: number
}

interface MetaContextType {        
    metas: Meta[]
    loading: boolean
    handleAdicionarMeta(metaProps: Meta): Promise<void>    
    handleReadByUserMetas(idUser: number): Promise<void>
}

const MetaContext = createContext<MetaContextType>({} as MetaContextType);

export const UseMetas = () => useContext(MetaContext);

export const MetasProvider: React.FC = ({ children }) => {
    const [metas, setMetas] = useState<Meta[]>([{}] as Meta[]);
    const [loading, setLoading] = useState(false)

    async function handleAdicionarMeta(meta: Meta) {
        console.log(meta.userMetaId);
        try {

            const response = await api.post('/goal/create', {
                descMeta: meta.descMeta,
                saldoFinalMeta: meta.saldoFinalMeta,
                saldoAtualMeta: meta.saldoAtualMeta,
                dataInicioMeta: meta.dataInicioMeta,
                dataFimMeta: meta.dataFimMeta,
                realizacaoMeta: meta.realizacaoMeta,
                userMetaId: meta.userMetaId,
            });

            if(response.data.error) console.log(response.data.error);

            console.log('response.data', response.data)
            await AsyncStorage.setItem('idMeta', String(response.data.message.id));

            const newMetas = metas;
            newMetas.push(response.data.message);

            setMetas(newMetas);
            return { ok: true };
        } catch (error) {
            console.log("Deu um erro no handleAdicionarMeta: " + error);
        }
    }
    
    async function handleReadByUserMetas(idUser: number) {
        console.log(idUser)
        setLoading(true)
        try {
            const response = await api.post(`/goal/findbyuser/${idUser}`)
                
            if(response.data.error) {
                ToastAndroid.show(response.data.error, ToastAndroid.SHORT)
            }
            console.log(response.data.metas)
            setMetas(response.data.metas)
            
            setLoading(false)

            console.log('metas: ' + metas)
        } catch (error) {
            console.log("Erro na leitura das metas: "+error)
        }
    }

    return (
        <MetaContext.Provider value={{ metas, handleReadByUserMetas, loading, handleAdicionarMeta }}>
            {children}
        </MetaContext.Provider>
    )
}