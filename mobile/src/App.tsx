import 'react-native-gesture-handler'
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contexts/AuthContext';
import { CategoriasProvider } from './contexts/CategoriesContext';
import { TransferenciaProvider } from './contexts/TransferContext';
import { LancamentoProvider } from './contexts/EntriesContext';
import { DadosTempProvider } from './contexts/TemporaryDataContext';
import { CategoriasContaProvider } from './contexts/CategoriesAccountContext';
import { ContasProvider } from './contexts/AccountContext';
import { ParcelaProvider } from './contexts/InstallmentContext';
import { MetasProvider } from './contexts/GoalsContext';

import Routes from './routes'

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>        
        <DadosTempProvider>          
          <ContasProvider>
            <MetasProvider>
              <ParcelaProvider>
                <LancamentoProvider>
                  <TransferenciaProvider>
                    <CategoriasProvider>          
                      <CategoriasContaProvider>
                          <Routes />
                      </CategoriasContaProvider>
                    </CategoriasProvider>
                  </TransferenciaProvider>
                </LancamentoProvider>
              </ParcelaProvider>
            </MetasProvider>
          </ContasProvider>
        </DadosTempProvider>
      </AuthProvider>            
    </NavigationContainer>
  );
};

export default App;