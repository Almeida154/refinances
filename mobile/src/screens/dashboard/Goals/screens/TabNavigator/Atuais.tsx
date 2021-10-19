import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';

import {GoalsStack} from '../../../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack'

import {UseMetas} from '../../../../../contexts/GoalsContext'

import { ActivityIndicator } from 'react-native-paper'

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

import goalsJson from './goals.json';

import { Title, Loading, TextLoading} from './styles'

import { ProgressBar, Colors } from 'react-native-paper';
import CardGoals from './CardGoals';

type PropsGoals = {
  navigation: StackNavigationProp<GoalsStack, "GoalsList">
}

const Goals = ({navigation}: PropsGoals) => {

  const {metas, handleReadByUserMetas} = UseMetas()
  const [stateReload, setStateReload] = useState(false)

  useEffect(() => {
    if(!navigation.addListener)
        return

    const focus = navigation.addListener('focus', () => {
        setStateReload(false)
        
    })

    const blur = navigation.addListener('blur', () => {
        setStateReload(true)
        
    })

    
}, [navigation])

  useEffect(() => {
    // Caso nenhuma meta seja carregada, recarregar
    if(!metas)
        (async function(){
            handleReadByUserMetas(await retornarIdDoUsuario())
        }) ()
          
  }, [])

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>

        {
          stateReload ? (

            <Loading>
              <ActivityIndicator size='large' color='#E8871E' />
              <TextLoading>Carregando...</TextLoading>
            </Loading>

          ) : 
            <View style={{margin: '10%'}}>
              <Title>
                Registre os depósitos para acompanhar o progresso de suas metas
              </Title>

              {
                metas && metas.map((item, index) => {
                  console.log("Item: ", metas)                    
                  return (
                    <CardGoals item={item} key={index}/>
                  )
                })   
              }
            </View>
          }

    </ScrollView>
  );
};

export default Goals;
