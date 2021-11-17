import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {BackHandler, ScrollView, View} from 'react-native'

import CardAccount from './CardAccount'

import Button from '../../../../../components/Button'

import {HomeAccountStack} from '../../../../../@types/RootStackParamApp'

import Icon from 'react-native-vector-icons/Ionicons';

import {
    Container,
    Title,
    Subtitle
} from './styles'

import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/core'

import {UseContas} from '../../../../../contexts/AccountContext'
import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'
import { Text } from '../../../../../components/Button/styles'
import { ActivityIndicator } from 'react-native-paper'
import { StackActions } from '@react-navigation/native'

import Header from '../../../../../components/Header'

type PropsManageAccount = {
    navigation: StackNavigationProp<HomeAccountStack, "ManageAccount">
}

const ManageAccount = ({navigation}: PropsManageAccount) => {
    const {contas, loading, handleReadByUserContas} = UseContas()
    const [stateReload, setStateReload] = useState(false)    

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', backAction);
      }, []);
    
      const backAction = () => {
        navigation.dispatch(StackActions.replace('Main', {screen: 'Home'}));
        
        return true;
      };
    
        
    useEffect(() => {
        console.log(contas)
        // Caso nenhuma conta foi carregada, recarregar
        if(!contas)
            (async function(){
                handleReadByUserContas(await retornarIdDoUsuario())
            }) ()
               
    }, [])

    

    return (
        <ScrollView>
            <Header
                title=""
                backButton={() => {
                    navigation.dispatch(
                    StackActions.replace('Main'))}}
            />
            
            {
                stateReload ? (
                    <View style={{alignSelf: 'center',
                     height: '100%',
                     justifyContent: 'center'}}>
                         <ActivityIndicator size='large' color='#E8871E' />
                         <Text style={{color: '#183153',
                           fontSize: 22,
                           fontFamily: 'Poppins-Bold',
                           marginTop: 20}}>Carregando...</Text>
                     </View>
                 ) :
                <Container>
                    
                    <Title>Bem vindo às suas contas!</Title>
                    <Subtitle>Aqui você as gerencia: editando, excluindo ou criando novas.</Subtitle>
                    {
                       contas && contas.map((item, index) => {
                           console.log("Item: ", item)                    
                            return (
                                <CardAccount item={item} key={index}/>
                            )
                        })   
                    }

                    <Button 
                        onPress={() => navigation.dispatch(StackActions.replace('StackAccount', {screen: 'CreateAccount'}))}
                        title="Criar"
                        color="#444"
                        backgroundColor="#ccc"
                    />   

                </Container>
            }
        </ScrollView>
    )
}

export default ManageAccount