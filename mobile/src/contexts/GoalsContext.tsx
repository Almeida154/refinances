import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { StackDescriptorMap } from '@react-navigation/stack/lib/typescript/src/types';

import retornarIdDoUsuario from '../helpers/retornarIdDoUsuario'

export type Meta = {
  id: number;
  descMeta: string;
  saldoFinalMeta: number;
  saldoAtualMeta: number;
  dataInicioMeta: string;
  dataFimMeta: string;
  realizacaoMeta: boolean;
  userMetaId: number;
};

interface MetaContextType {
  metas: Meta[] | null;
  loading: boolean;
  handleAdicionarMeta(metaProps: Meta): Promise<void>;
  handleReadByUserMetas(idUser: number): Promise<void>;
}

const MetaContext = createContext<MetaContextType>({} as MetaContextType);

export const UseMetas = () => useContext(MetaContext);

export const MetasProvider: React.FC = ({ children }) => {
  const [metas, setMetas] = useState<Meta[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAdicionarMeta(meta: Meta) {
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

      console.log(response.data);

      if (response.data.error) console.log(response.data.error);

      console.log('response.data', response.data);      

      const newMetas = metas == null ? null : metas.slice();

      if(!newMetas) {
          //Caso cadastrou e não tinha nenhuma outras metas carregadas, carregar todas contando com a atual
          handleReadByUserMetas(await retornarIdDoUsuario())
      } else {
          //Caso cadastrou e tinha outras metas carregadas, adicionar a criada no final do vetor
          newMetas.push(response.data.meta)
      }

      setMetas(newMetas);
    } catch (error) {
      console.log('Deu um erro no handleAdicionarMeta: ' + error);
    }
  }

  async function handleReadByUserMetas(idUser: number) {    
    try {
      const response = await api.post(`/goal/findbyuser/${idUser}`);

      if (response.data.error) {
        ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
      }
      console.log(response.data.metas);
      setMetas(response.data.metas);
      

      console.log('metas: ' + metas);
    } catch (error) {
      console.log('Erro na leitura das metas: ' + error);
    }
  }

  async function handleAtualizarMeta(meta: Meta, idUser: number) {
    try {
      const response = await api.post(`/goal/edit/${idUser}`, {
        descMeta: meta.descMeta,
        saldoFinalMeta: meta.saldoFinalMeta,
        saldoAtualMeta: meta.saldoAtualMeta,
        dataInicioMeta: meta.dataInicioMeta,
        dataFimMeta: meta.dataFimMeta,
        realizacaoMeta: meta.realizacaoMeta,
        userMetaId: meta.userMetaId,
      });

      console.log(response.data);

      if (response.data.error) console.log(response.data.error);

      console.log('response.data', response.data);      

      const updateMetas = metas == null ? null : metas.slice();

      if(!updateMetas) {
          //Caso cadastrou e não tinha nenhuma outras metas carregadas, carregar todas contando com a atual
          handleReadByUserMetas(await retornarIdDoUsuario())
      } else {
          //Caso cadastrou e tinha outras metas carregadas, adicionar a criada no final do vetor
          updateMetas.push(response.data.meta)
      }
      
      setMetas(updateMetas);
    } catch (error) {
      console.log('Deu um erro no handleUpdateMeta: ' + error);
    }
  }

  return (
    <MetaContext.Provider
      value={{ metas, handleReadByUserMetas, loading, handleAdicionarMeta }}>
      {children}
    </MetaContext.Provider>
  );
};
