import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {ScrollView} from 'react-native'

import CardAccount from './CardAccount'

import {HomeAccountStack} from '../../../../../@types/RootStackParamApp'

import {
    Container,
    ButtonAdd,
    TextButton
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
                    {
                       contas && contas.map((item, index) => {
                           console.log("Item",)                    
                            return (
                                <CardAccount item={item} key={index}/>
                            )
                        })   
                    }

                    <ButtonAdd onPress={() => navigation.navigate('CreateAccount')}>
                        <TextButton>Adicionar</TextButton>
                    </ButtonAdd>

                    
                </Container>
            }
        </ScrollView>
    )
}

export default ManageAccount