import 'react-native-gesture-handler'
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contexts/AuthContext';
import { CategoriasProvider } from './contexts/CategoriesContext';
import { LancamentoProvider } from './contexts/LancamentosContext';
import { DadosTempProvider } from './contexts/DadosTemporariosContext';
import { CategoriasContaProvider } from './contexts/CategoriesContaContext';
import { ContasProvider } from './contexts/ContasContext';
import { ParcelaProvider } from './contexts/ParcelaContext';

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