import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import {View, Image} from 'react-native'

import Button from '../../../../../components/Button'

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
import {colors, fonts, metrics} from '../../../../../styles'
import { StackActions } from '@react-navigation/native'


type CardAccount = {
    item: Conta
}

const CardAccount = ({item}: CardAccount) => {
    if(typeof item.categoryConta == 'string')
        return <View />

    return(
        <ContainerCardAccount>
            <SectionDescription>
                <SectionIcon style={{borderColor: item.categoryConta.corCategoryConta}}>
                    {
                        item.categoryConta.iconeCategoryConta.indexOf("https://") != -1 ?
                        <Image source={{uri: item.categoryConta.iconeCategoryConta, width: 25, height: 25}} /> :
                        <Icon size={25} color='gray' stringIcon={item.categoryConta.iconeCategoryConta}/>
                    }
                </SectionIcon>
                <SectionName>
                    <LabelName>{item.descricao}</LabelName>
                    <LabelCategory>{item.categoryConta.descricaoCategoryConta}</LabelCategory>
                </SectionName>
            </SectionDescription>
            <SectionBalanceAccount>
                <LabelBalanceAccount>{item.saldoConta.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL'})}</LabelBalanceAccount>                    
            </SectionBalanceAccount>            
        </ContainerCardAccount>
    )
}



const SectionAccount = () => {
    const {contas, handleReadByUserContas} = UseContas()
    const [saldo, setSaldo] = useState('0')
    const [saldoConta, setSaldoConta] = useState('0');
    const { navigation }  = UseDadosTemp()

    useEffect(() => {
        let aux = 0

        contas && contas.map(item => {
            aux += item.saldoConta
            setSaldoConta((item.saldoConta).toLocaleString('pt-br',{ style: 'currency', currency: 'BRL'}))
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
                <LabelDescriptionBalance>Saúde financeira</LabelDescriptionBalance>
                <LabelBalance>{saldo}</LabelBalance>
            </SectionBalance>

            <Separator />

            <ContainerAccount>
                <LabelDescriptionAccount>Minhas contas</LabelDescriptionAccount>

                {
                    
                    contas && contas.map((item, index) => {
                        if(index > 1 )
                            return

                        return (
                            <CardAccount key={index} item={item}/>
                        )
                    })
                }

                <Button 
                    onPress={() => navigation.dispatch(
                        StackActions.replace('StackAccount', 
                        {screen: 'ManageAccount'})
                        )}
                    title="Gerenciar"
                    color={colors.darkGray}
                    backgroundColor={colors.lightGray}
                /> 
            </ContainerAccount>
        </Container>
    )
}

export default SectionAccount