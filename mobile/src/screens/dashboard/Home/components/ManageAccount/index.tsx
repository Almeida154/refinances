import React from 'react'

import CardAccount from './CardAccount'

import {HomeAccountStack} from '../../../../../@types/RootStackParamApp'

import {
    Container,
    ButtonAdd,
    TextButton
} from './styles'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/core'

type PropsManageAccount = {
    navigation: StackNavigationProp<HomeAccountStack, "ManageAccount">,    
    route: RouteProp<HomeAccountStack, "ManageAccount">,
}
const ManageAccount = ({route, navigation}: PropsManageAccount) => {
    
    return (
        <Container>
            <CardAccount />

            <ButtonAdd onPress={() => navigation.navigate('CreateAccount')}>
                <TextButton>Adicionar</TextButton>
            </ButtonAdd>
        </Container>
    )
}

export default ManageAccount