import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { StackDescriptorMap } from '@react-navigation/stack/lib/typescript/src/types';

import retornarIdDoUsuario from '../helpers/retornarIdDoUsuario';
import { UseAuth } from './AuthContext';

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
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>   
  }
  
  const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);
  
  export const UseConfig = () => useContext(ConfigContext);
  
  export const ConfigProvider: React.FC = ({ children }) => {    
    const [config, setConfig] = useState<Config[] | null>(null);      
    const {user} = UseAuth()
    const [isDark, setIsDark] = useState<boolean>(user.config?.theme == 'dark');      

    return (
      <ConfigContext.Provider
        value={{
          config, 
          isDark,
          setIsDark         
        }}>          
        {children}
      </ConfigContext.Provider>
    );
  };
  