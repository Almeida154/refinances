import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { StackDescriptorMap } from '@react-navigation/stack/lib/typescript/src/types';

import retornarIdDoUsuario from '../helpers/retornarIdDoUsuario';
import { Lancamento, UseLancamentos } from './EntriesContext';

export type Config = {
    id: number;
    fingerprint: number;
    theme: string;
    senha: string;
    idioma: boolean;
    userIdid: number;
  };
  
  interface ConfigContextType {
    config: Config[] | null;
    loading: boolean;
    handleAdicionarConfigByUser(configProps: Config, id: number): Promise<void>;
    handleReadByUserConfig(idUser: number): Promise<void>;
    handleGetConfigById(id: number): Promise<void>;
    handleAtualizarConfig (config: Config, id: number): Promise<void>;
  }
  
  const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);
  
  export const UseConfig = () => useContext(ConfigContext);
  
  export const ConfigProvider: React.FC = ({ children }) => {
    const [config, setConfig] = useState<Config[] | null>(null);
    const [loading, setLoading] = useState(false);
  
    async function handleAdicionarConfigByUser(config: Config) {    
      try {
        const response = await api.post('/config/create/', {
          fingerprint: config.fingerprint,
          theme: config.theme,
          senha: config.senha,
          idioma: config.idioma,
          userIdid: config.userIdid,
        });
  
        console.log(response.data);
  
        if (response.data.error) console.log(response.data.error);
  
        console.log('response.data', response.data);
  
        const newConfig = config == null ? null : config.slice();
  
        if (!newConfig) {
          //Caso cadastrou e não tinha nenhuma outras metas carregadas, carregar todas contando com a atual
          handleReadByUserConfig(await retornarIdDoUsuario());
        } else {
          //Caso cadastrou e tinha outras metas carregadas, adicionar a criada no final do vetor
          newConfig.push(response.data.meta);
        }
  
        setConfig(newConfig);
      } catch (error) {
        console.log('Deu um erro no handleAdicionarConfig: ' + error);
      }
    }
  
    async function handleReadByUserConfig(idUser: number) {
      try {
        const response = await api.post(`/config/read/${idUser}`);
  
        if (response.data.error) {
          ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
        }
        console.log(response.data.metas);
        setConfig(response.data.metas);
  
        console.log(response.data.metas[0])
        console.log('Config: ' + config);
      } catch (error) {
        console.log('Erro na leitura das Config: ' + error);
      }
    }
  
    async function handleAtualizarConfig(config: Config, id: number) {
      try {
        const response = await api.post(`/config/edit/${id}`, {
            fingerprint: config.fingerprint,
            theme: config.theme,
            senha: config.senha,
            idioma: config.idioma,
            userIdid: config.userIdid,
          });
  
        console.log(response.data);
  
        if (response.data.error) console.log(response.data.error);
  
        console.log('response.data', response.data);
  
        const updateConfig = config == null ? null : config.slice();
  
        if (!updateConfig) {
          //Caso atualizou e não tinha nenhuma outras metas carregadas, carregar todas contando com a atual
          handleReadByUserConfig(await retornarIdDoUsuario());
        } else {
          console.log(response.data.metas);
          setConfig(response.data.metas);
  
          console.log('Config: ' + config);
        }
  
        
      } catch (error) {
        console.log('Deu um erro no handleUpdateConfig: ' + error);
      }
    }
  
    async function handleGetConfigById(id: number) {
      try {
        const response = await api.get(`/config/read/${id}`);
        return response.data.goal;
      } catch (error) {
        console.debug('ConfigContext | handleGetConfigById: ' + error);
      }
    }
  
  
    return (
      <ConfigContext.Provider
        value={{
          config,
          loading,
          handleReadByUserConfig,
          handleAdicionarConfigByUser,
          handleGetConfigById,
          handleAtualizarConfig,
        }}>          
        {children}
      </ConfigContext.Provider>
    );
  };
  