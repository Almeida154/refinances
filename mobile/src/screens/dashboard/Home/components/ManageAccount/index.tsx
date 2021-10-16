import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {ScrollView} from 'react-native'

import CardAccount from './CardAccount'

import Button from '../../../../../components/Button'
import ButtonAdd from '../../../../../components/ButtonAdd'

import {HomeAccountStack} from '../../../../../@types/RootStackParamApp'

import ActionButton from 'react-native-action-button';
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

type PropsManageAccount = {
    navigation: StackNavigationProp<HomeAccountStack, "ManageAccount">
}

const ManageAccount = ({navigation}: PropsManageAccount) => {
    const {contas, loading, handleReadByUserContas} = UseContas()
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
    

    console.log("foi dew volta", stateReload)
        console.log(navigation.isFocused())
        
    useEffect(() => {
        // Caso nenhuma conta foi carregada, recarregar
        if(!contas)
            (async function(){
                handleReadByUserContas(await retornarIdDoUsuario())
            }) ()
               
    }, [])

    

    return (
        <ScrollView>
            
            {
                stateReload ? <Text>Carregando</Text> :
                <Container>
                    <Title>Bem vindo às suas contas!</Title>
                    <Subtitle>Aqui você as gerencia: editando, excluindo ou criando novas.</Subtitle>
                    {
                       contas && contas.map((item, index) => {
                           console.log("Item",)                    
                            return (
                                <CardAccount item={item} key={index}/>
                            )
                        })   
                    }

                    <Button 
                        onPress={() => navigation.navigate('CreateAccount')}
                        title="Criar"
                        color="#444"
                        backgroundColor="#ccc"
                    />   

                    {/*<ButtonAdd
                        onPress={() => console.log('ok')}
                        backgroundColor="#fff"
                    />*/}

                    
                    
                </Container>
            }
        </ScrollView>
    )
}

export default ManageAccount