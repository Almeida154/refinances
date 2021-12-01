import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import {View} from 'react-native'

import { PropsMainRoutes } from '../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import { IHandles } from 'react-native-modalize/lib/options';
import { Modalize } from 'react-native-modalize';
import { Transferencia } from './TransferContext';
import { ReadParcela } from './InstallmentContext';

import Toast from '@zellosoft.com/react-native-toast-message';

interface DadosTempContextType {  
  navigation: StackNavigationProp<PropsMainRoutes, 'Main'>;
  modalizeRefDetailEntry: React.RefObject<IHandles>;

  setNavigation: React.Dispatch<
    React.SetStateAction<StackNavigationProp<PropsMainRoutes, 'Main'>>
  >;  

  selectedItemExtract: ReadParcela | Transferencia | null;
  setSelectedItemExtract: React.Dispatch<React.SetStateAction<ReadParcela | Transferencia | null>>

  showNiceToast(
    type: string,
    title?: string | null,
    message?: string | null,
    time?: number | null,
    detailed?: boolean,
  ): any;

  hideNiceToast(): any;

  buttonIsEnabled: boolean,
  setButtonIsEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const DadosTempContext = createContext<DadosTempContextType>(
  {} as DadosTempContextType,
);

export const UseDadosTemp = () => useContext(DadosTempContext);

export const DadosTempProvider: React.FC = ({ children }) => {
 
  const [navigation, setNavigation] = useState(
    {} as StackNavigationProp<PropsMainRoutes, 'Main'>,
  );

  const [selectedItemExtract, setSelectedItemExtract] = useState<ReadParcela | Transferencia | null>(null)

  const modalizeRefDetailEntry = useRef<Modalize>(null)
  
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false)

  function showNiceToast(
    type: string,
    title?: string | null,
    message?: string | null,
    time?: 2500 | null,
    detailed?: boolean | null,
  ) {
    Toast.show({
      type: 'niceToast',
      visibilityTime: time || 2500,
      position: 'top',
      // onShow: () => console.log('mostrou'),
      // onPress: () => console.log('tocado'),
      props: {
        type,
        title,
        message,
        detailed,
      },
    });
  }

  function hideNiceToast() {
    Toast.hide();
  }  

  return (
    <DadosTempContext.Provider
      value={{
        buttonIsEnabled,
        setButtonIsEnabled,      
        showNiceToast,
        hideNiceToast,
        selectedItemExtract,
        setSelectedItemExtract,
        modalizeRefDetailEntry,
        setNavigation,
        navigation,       
      }}>
      {children}
    </DadosTempContext.Provider>
  );
};
