import React from 'react';

import {Meta} from '../../../../../../contexts/GoalsContext'

import { ProgressBar } from 'react-native-paper'

import { Goal, GoalDesc, DaysLeft, 
    InvestedMoney, Percent, PercentText, } from '../styles'
import { toDate } from '../../../../../../helpers/manipularDatas';

type PropsCardGoals = {
    item: Meta
}

const CardGoals = ({item}: PropsCardGoals) => {

  const objDataFimMeta = toDate(item.dataFimMeta)
    const objDataIniMeta = toDate(item.dataInicioMeta)

    const diff = Math.abs(objDataFimMeta.getTime() - objDataIniMeta.getTime()); // Subtrai uma data pela outra
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).            

    
    const percentageBalance = item.saldoAtualMeta * 100 / item.saldoFinalMeta // Algum cálculo para calcular a porcentagem aqui
    
    return (
        <Goal
            key={item.id}>
            <GoalDesc>{item.descMeta}</GoalDesc>

          <DaysLeft>
            ! Faltam {days} dias
          </DaysLeft>

          <ProgressBar
            progress={percentageBalance / 100}
            color="#F81650"
            style={{
              height: 10,
              marginVertical: 8,
              borderRadius: 10
            }}
          />

          <InvestedMoney>
            {`R$ ${item.saldoAtualMeta} de R$ ${item.saldoFinalMeta}`}
          </InvestedMoney>

           <Percent>
            <PercentText>
              {percentageBalance}%
            </PercentText>
          </Percent>
        </Goal>
    )
}

export default CardGoals;