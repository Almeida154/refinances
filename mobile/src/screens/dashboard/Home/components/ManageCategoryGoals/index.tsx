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
    ContainerCard,

    Goal,
    GoalDesc,
    GoalDaysLeft,
    GoalPercent, 
    VwPercent
} from './styles'



const CardGoal = ({item}: {item: Meta}) => {
    const objDataFimMeta = toDate(item.dataFimMeta)
    const objDataIniMeta = toDate(item.dataInicioMeta)

    const diff = Math.abs(objDataFimMeta.getTime() - objDataIniMeta.getTime()); // Subtrai uma data pela outra
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

    const totalTime = objDataFimMeta.getTime()
    const percentageTime = objDataIniMeta.getTime() * 100 / totalTime // Algum cálculo para calcular a porcentagem aqui

    console.log(item.descMeta, percentageTime / 100)
    return(
        <ContainerCard>
            <Goal>
                <GoalDesc>{item.descMeta}</GoalDesc>
                <GoalDaysLeft>! Faltam {days} dias</GoalDaysLeft>

                <ProgressBar
                    progress={percentageTime / 100}
                    color="#F81650"
                    style={{
                        height: 10,
                        marginVertical: 8,
                    }}
                />

                <VwPercent><GoalPercent>{percentageTime.toFixed(0)}%</GoalPercent>
                </VwPercent>
            </Goal>
        </ContainerCard>
    )
}

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'
import {Meta, UseMetas} from '../../../../../contexts/GoalsContext'

const SectionManage = () => {
    const {navigation} = UseDadosTemp()
    const {handleReadByUserMetas, metas} = UseMetas()


    useEffect(() => {
        // Caso nenhuma meta seja carregada, recarregar
        if(!metas)
            (async function(){
                handleReadByUserMetas(await retornarIdDoUsuario())
            }) ()
              
      }, [])

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
                            <CardGoal item={item}/>
                        )
                    })
                }

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