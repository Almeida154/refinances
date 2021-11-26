import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';

import { GoalsStack } from '../../../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack'

import {UseMetas} from '../../../../../contexts/GoalsContext'

import { ActivityIndicator } from 'react-native-paper'

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

import { Title, Subtitle, Loading, TextLoading} from './styles'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts, metrics} from '../../../../../styles'

import Button from '../../../../../components/Button';

import CardGoals from './CardGoals';
import { StackActions } from '@react-navigation/native';

type PropsGoals = {
  navigation: StackNavigationProp<GoalsStack, "GoalsList">
}

const GoalsAccomplished = ({navigation}: PropsGoals) => {
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

  /*const [metasRealizadas, setMetasRealizadas] = useState(
    !metas ? null : metas.filter(metas => metas.realizacaoMeta),
  );*/

  if(metas && metas.length > 0 ){
    return (
      <ScrollView style={{ backgroundColor: colors.white }}>
  
          {
            stateReload ? (
  
              <Loading>
                <ActivityIndicator size='large' color={colors.paradisePink} />
                <TextLoading>Carregando...</TextLoading>
              </Loading>
  
            ) : 
  
              <View style={{margin: '10%'}}>
                <Title>
                  Parabéns!
                </Title>
  
                <Subtitle>
                  Continue registrando suas metas financeiras para viver uma vida mais confortável
                </Subtitle>
                {metas &&
                  metas.map((item, index) => {
                    console.log('Item: ', UseMetas);
                    if(item.saldoAtualMeta >= item.saldoFinalMeta)
                      return <CardGoals item={item} key={index} />;
              })}
              </View>
            }
  
      </ScrollView>
    );
  }
  else{
    return (
      <ScrollView style={{ backgroundColor: colors.cultured }}>
        <View style={{margin: '10%',
          alignItems: 'center'}}>

          <Icon name="emoticon-sad-outline" size={50}
            color={colors.davysGrey}
            style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30
          }}/>

          <Title>
            Você ainda não concluiu nenhuma meta!
          </Title>
      
          <Subtitle>
              Mas não desanime, é importante investir mensalmente em suas metas para concluí-las!
          </Subtitle>

          <Button
            title="Criar nova meta"
            backgroundColor={colors.blackSilver}
            onPress={() => {navigation.dispatch(StackActions.replace('CreateGoals'))}}>
          </Button>
        </View>
    </ScrollView>
    );
  }
};

export default GoalsAccomplished;
