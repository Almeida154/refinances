import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import { ProgressBar, Colors } from 'react-native-paper';

import Button from '../../../../../components/Button';

import {
    Container,
    LabelDescription,
    Separator,
    LabelDescriptionGoals,
    SectionTop,
    ContainerGoals,
    ContainerCard,

    Goal,
    GoalDesc,
    GoalDaysLeft,
    GoalPercent, 
    VwPercent
} from './styles'



const CardGoal = () => {
    return(
        <ContainerCard>
            <Goal>
                <GoalDesc>Brastemp 5 portas</GoalDesc>
                <GoalDaysLeft>! Faltam 14 dias</GoalDaysLeft>

                <ProgressBar
                    progress={0.5}
                    color="#F81650"
                    style={{
                        height: 10,
                        marginVertical: 8,
                    }}
                />

                <VwPercent><GoalPercent>50%</GoalPercent>
                </VwPercent>
            </Goal>
        </ContainerCard>
    )
}

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

const SectionManage = () => {
    const {navigation} = UseDadosTemp()
    
    return (
        <Container>
            <SectionTop>
                <LabelDescription>Gerencie suas metas acompanhe seus avanços.</LabelDescription>
            </SectionTop>

            <Separator />

            <ContainerGoals>
                <LabelDescriptionGoals>Minhas metas</LabelDescriptionGoals>

                <CardGoal />

                <Button
                    onPress={() => navigation.navigate('GoalsStack', {screen: 'GoalsList'})}
                    title="Gerenciar"
                    color="#444"
                    backgroundColor="#f5f2f3"
                />
            </ContainerGoals>
        </Container>
    )
}

export default SectionManage