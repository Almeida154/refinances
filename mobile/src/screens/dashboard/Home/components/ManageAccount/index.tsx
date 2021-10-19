import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {ScrollView, View} from 'react-native'

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
                        onPress={() => navigation.navigate('CreateAccount')}
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