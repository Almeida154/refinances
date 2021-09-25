import 'react-native-gesture-handler'
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contexts/AuthContext';
import { CategoriasProvider } from './contexts/CategoriesContext';
import { LancamentoProvider } from './contexts/EntriesContext';
import { DadosTempProvider } from './contexts/TemporaryDataContext';
import { CategoriasContaProvider } from './contexts/CategoriesAccountContext';
import { ContasProvider } from './contexts/AccountContext';
import { ParcelaProvider } from './contexts/InstallmentContext';

import Routes from './routes'

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>        
        <DadosTempProvider>          
          <ContasProvider>
            <ParcelaProvider>
              <LancamentoProvider>
                <CategoriasProvider>          
                  <CategoriasContaProvider>
                      <Routes />
                  </CategoriasContaProvider>
                </CategoriasProvider>
              </LancamentoProvider>
            </ParcelaProvider>
          </ContasProvider>
        </DadosTempProvider>
      </AuthProvider>            
    </NavigationContainer>
  );
};

export default App;