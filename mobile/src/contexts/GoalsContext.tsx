import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { StackDescriptorMap } from '@react-navigation/stack/lib/typescript/src/types';

import retornarIdDoUsuario from '../helpers/retornarIdDoUsuario';
import { Lancamento, UseLancamentos } from './EntriesContext';

export type Meta = {
  id: number;
  descMeta: string;
  saldoFinalMeta: number;
  saldoAtualMeta: number;
  dataInicioMeta: string;
  dataFimMeta: string;
  realizacaoMeta: boolean;
  userMetaId: number;
  lancamentoMeta: Lancamento;
};

interface MetaContextType {
  metas: Meta[] | null;
  loading: boolean;
  handleAdicionarMeta(metaProps: Meta): Promise<void>;
  handleReadByUserMetas(idUser: number): Promise<void>;
  handleGetGoalById(id: number): Promise<void>;
  handleRemoveGoalById(id: number): Promise<void>;
  handleAtualizarMeta (meta: Meta, id: number): Promise<void>;
}

const MetaContext = createContext<MetaContextType>({} as MetaContextType);

export const UseMetas = () => useContext(MetaContext);

export const MetasProvider: React.FC = ({ children }) => {
  const {handleAdicionarLancamento} = UseLancamentos()
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
        lancamentoMeta: meta.lancamentoMeta
      });

      console.log(response.data);

      if (response.data.error) console.log(response.data.error);

      console.log('response.data', response.data);

      const newMetas = metas == null ? null : metas.slice();

      if (!newMetas) {
        //Caso cadastrou e não tinha nenhuma outras metas carregadas, carregar todas contando com a atual
        handleReadByUserMetas(await retornarIdDoUsuario());
      } else {
        //Caso cadastrou e tinha outras metas carregadas, adicionar a criada no final do vetor
        newMetas.push(response.data.meta);
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

      console.log(response.data.metas[0])
      console.log('metas: ' + metas);
    } catch (error) {
      console.log('Erro na leitura das metas: ' + error);
    }
  }

  async function handleAtualizarMeta(meta: Meta, id: number) {
    try {
      const response = await api.put(`/goal/edit/${id}`, {
        descMeta: meta.descMeta,
        saldoFinalMeta: meta.saldoFinalMeta,
        saldoAtualMeta: meta.saldoAtualMeta,
        dataInicioMeta: meta.dataInicioMeta,
        dataFimMeta: meta.dataFimMeta,
        realizacaoMeta: meta.realizacaoMeta,
        userMeta: meta.userMetaId,
        lancamentoMeta: meta.lancamentoMeta,
        // eu troquei o método 'one' lá no GoalController, pq tava vindo junto com o usuário e a foto de perfil é absurdamente grande, agora só vem a meta mesmo, em vez desse userMetaId receber da meta, ele pode receber daquela função 'retornarIdDoUsuario';
      });

      console.log(response.data);

      if (response.data.error) console.log(response.data.error);

      console.log('response.data', response.data);

      const updateMetas = metas == null ? null : metas.slice();

      if (!updateMetas) {
        //Caso atualizou e não tinha nenhuma outras metas carregadas, carregar todas contando com a atual
        handleReadByUserMetas(await retornarIdDoUsuario());
      } else {
        console.log(response.data.metas);
        setMetas(response.data.metas);

        console.log('metas: ' + metas);
      }

      
    } catch (error) {
      console.log('Deu um erro no handleUpdateMeta: ' + error);
    }
  }

  async function handleGetGoalById(id: number) {
    try {
      const response = await api.get(`/goal/read/${id}`);
      return response.data.goal;
    } catch (error) {
      console.debug('GoalsContext | handleGetGoalById: ' + error);
    }
  }

  async function handleRemoveGoalById(id: number) {
    try {
      const response = await api.delete(`/goal/remove/${id}`);
      handleReadByUserMetas(await retornarIdDoUsuario()); 
      return response.data.goal;
    } catch (error) {
      console.debug('GoalsContext | handleRemoveGoalById: ' + error);
    }
  }

  return (
    <MetaContext.Provider
      value={{
        metas,
        loading,
        handleReadByUserMetas,
        handleAdicionarMeta,
        handleGetGoalById,
        handleAtualizarMeta,
        handleRemoveGoalById,
      }}>
      {children}
    </MetaContext.Provider>
  );
};
