import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import {toDate} from '../../../../../helpers/manipularDatas'

import { ProgressBar, Colors } from 'react-native-paper';

import Button from '../../../../../components/Button';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

import {
    Container,
    LabelDescription,
    Separator,
    LabelDescriptionGoals,
    SectionTop,
    ContainerGoals,
    Goal
} from './styles'

import CardGoals from '../../../Goals/screens/TabNavigator/CardGoals'

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'
import {Meta, UseMetas} from '../../../../../contexts/GoalsContext'
import { StackActions } from '@react-navigation/native';

const SectionManage = () => {
    const {navigation} = UseDadosTemp()
    const { metas, handleReadByUserMetas } = UseMetas();

    useEffect(() => {
        // Caso nenhuma meta seja carregada, recarregar
        if(!metas)
            (async function(){
                handleReadByUserMetas(await retornarIdDoUsuario())
            }) ()
              
      }, [])

      if (metas?.length > 0) {
        return (
            <Container>
            <SectionTop>
                <LabelDescription>Gerencie suas metas acompanhe seus avanços.</LabelDescription>
            </SectionTop>

            <Separator />

            <ContainerGoals>
                <LabelDescriptionGoals>Minhas metas</LabelDescriptionGoals>

                {
                    metas && metas.map((item, index) => {
                        
                        return (
                            <CardGoals item={item} key={index}/>
                        )
                    })
                }

                <Button
                    onPress={() => navigation.dispatch(StackActions.replace('GoalsList'))}
                    title="Gerenciar"
                    color="#444"
                    backgroundColor="#f5f2f3"
                />
            </ContainerGoals>
        </Container>
        );
      } else {
        return (
            <Container>
            <SectionTop>
                <LabelDescription>Gerencie suas metas acompanhe seus avanços.</LabelDescription>
            </SectionTop>

            <Separator />

            <ContainerGoals>
                <LabelDescriptionGoals>Você ainda não possui metas.</LabelDescriptionGoals>

                <Button
                    onPress={() => navigation.dispatch(StackActions.replace('GoalsStack', {screen: 'CreateGoals'}))}
                    title="Criar"
                    color="#444"
                    backgroundColor="#f5f2f3"
                />
            </ContainerGoals>
        </Container>
        );
      }
}

export default SectionManage