import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import {PropsHome} from '../../'

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'
import Icon from '../../../../../helpers/gerarIconePelaString'

import { UseContas, Conta } from '../../../../../contexts/AccountContext'

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


type CardAccount = {
    item: Conta
}

const CardAccount = ({item}: CardAccount) => {
    return(
        <ContainerCardAccount>
            <SectionDescription>
                <SectionIcon>
                    <Icon size={25} color='gray' stringIcon={typeof item.categoryConta == 'string' ? 'Ionics:wallet' : item.categoryConta.iconeCategoryConta}/>
                </SectionIcon>
                <SectionName>
                    <LabelName>{item.descricao}</LabelName>
                    <LabelCategory>Conta Corrente</LabelCategory>
                </SectionName>
            </SectionDescription>
            <SectionBalanceAccount>
                <LabelBalanceAccount>{item.saldoConta}</LabelBalanceAccount>                    
            </SectionBalanceAccount>            
        </ContainerCardAccount>
    )
}



const SectionAccount = ({navigation}: PropsHome) => {
    const {contas, handleReadByUserContas} = UseContas()
    const [saldo, setSaldo] = useState('0')

    useEffect(() => {
        let aux = 0

        contas && contas[0].id && contas.map(item => {
            aux += item.saldoConta
        })

        setSaldo(aux.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL'}))
        
    }, [contas])

    useEffect(() => {
        (async function(){
            handleReadByUserContas(await retornarIdDoUsuario())
        })()    
        console.log('contas', contas[0])           
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

                {
                    
                    contas && contas[0].id && contas.map((item, index) => {
                        if(index > 1 )
                            return

                        return (
                            <CardAccount key={index} item={item}/>
                        )
                    })
                }

                <ButtonManager onPress={() => navigation.navigate('ManageAccount')}><LabelManager>Gerenciar</LabelManager></ButtonManager>
            </ContainerAccount>
        </Container>
    )
}

export default SectionAccount