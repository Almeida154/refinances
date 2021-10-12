import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/Ionicons'

import {PropsHome} from '../../'

import {
    Container,
    LabelDescriptionBalance,
    LabelBalance,
    Separator,
    LabelDescriptionAccount,
    ButtonManager,
    LabelManager,
    SectionBalance,
    ContainerAccount,

    ContainerCardAccount,
    SectionDescription,
    SectionName,
    LabelName,
    LabelCategory,
    SectionBalanceAccount,
    LabelBalanceAccount,
    SectionIcon
} from './styles'



const CardAccount = () => {
    return(
        <ContainerCardAccount>
            <SectionDescription>
                <SectionIcon>
                    <Icon name="wallet-outline" size={25} color="gray"/>
                </SectionIcon>
                <SectionName>
                    <LabelName>Carteira</LabelName>
                    <LabelCategory>Conta Corrente</LabelCategory>
                </SectionName>
            </SectionDescription>
            <SectionBalanceAccount>
                <LabelBalanceAccount>997,00</LabelBalanceAccount>                    
            </SectionBalanceAccount>            
        </ContainerCardAccount>
    )
}

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'
import { UseContas } from '../../../../../contexts/AccountContext'

const SectionAccount = ({navigation}: PropsHome) => {
    const {contas, loading, handleReadByUserContas} = UseContas()
    const [saldo, setSaldo] = useState('0')

    console.log(navigation)

    useEffect(() => {
        let aux = 0

        contas.map(item => {
            aux += item.saldoConta
        })

        setSaldo(aux.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL'}))

    }, [contas])

    useEffect(() => {
        (async function(){
            handleReadByUserContas(await retornarIdDoUsuario())
        })()               
    }, [])
    return (
        <Container>
            <SectionBalance>
                <LabelDescriptionBalance>Saldo total</LabelDescriptionBalance>
                <LabelBalance>{saldo}</LabelBalance>
            </SectionBalance>

            <Separator />

            <ContainerAccount>
                <LabelDescriptionAccount>Minhas contas</LabelDescriptionAccount>

                <CardAccount />

                <ButtonManager onPress={() => navigation.navigate('ManageAccount')}><LabelManager>Gerenciar</LabelManager></ButtonManager>
            </ContainerAccount>
        </Container>
    )
}

export default SectionAccount