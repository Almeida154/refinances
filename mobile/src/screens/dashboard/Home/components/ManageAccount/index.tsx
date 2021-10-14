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

const ManageAccount = () => {
    const {contas, loading, handleReadByUserContas} = UseContas()
    const [stateReload, setStateReload] = useState(false)

    const {navigation} = UseDadosTemp()
    

    useEffect(() => {
        if(!navigation.addListener)
            return

        const focus = navigation.addListener('focus', () => {
            setStateReload(false)
            
        })

        const blur = navigation.addListener('blur', () => {
            setStateReload(true)
            
        })

        console.log(stateReload)
    }, [navigation])
    
    if(stateReload)
        setStateReload(false)

    useEffect(() => {
        // Caso nenhuma conta foi carregada, recarregar
        if(!contas[0].id)
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
                        !loading && contas[0].id && contas.map((item, index) => {                    
                            return (
                                <CardAccount item={item} key={index}/>
                            )
                        })   
                    }

                    <ButtonAdd onPress={() => navigation.navigate('StackAccount', {screen: 'CreateAccount'})}>
                        <TextButton>Adicionar</TextButton>
                    </ButtonAdd>

                    
                </Container>
            }
        </ScrollView>
    )
}

export default ManageAccount