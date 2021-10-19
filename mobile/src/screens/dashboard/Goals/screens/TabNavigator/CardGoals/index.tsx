import React from 'react';

import {Meta} from '../../../../../../contexts/GoalsContext'

import { ProgressBar } from 'react-native-paper'

import { Goal, GoalDesc, DaysLeft, 
    InvestedMoney, Percent, PercentText, } from '../styles'

type PropsCardGoals = {
    item: Meta
}

const CardGoals = ({item}: PropsCardGoals) => {

    const handleProgress = (atual: number, final: number) => {
        let percent = (atual * 100) / final;
        return Number.isInteger(percent) ? percent : percent.toFixed(1);
    };

    return (
        <Goal
            key={item.id}>
            <GoalDesc>{item.descMeta}</GoalDesc>

          <DaysLeft>
            ! Faltam 14 dias
          </DaysLeft>

          <ProgressBar
            progress={0.5}
            color="#F81650"
            style={{
              height: 10,
              marginVertical: 8,
            }}
          />

          <InvestedMoney>
            {`R$ ${item.saldoAtualMeta} de R$ ${item.saldoFinalMeta}`}
          </InvestedMoney>

           <Percent>
            <PercentText>
              {handleProgress(item.saldoAtualMeta, item.saldoFinalMeta)}%
            </PercentText>
          </Percent>
        </Goal>
    )
}

export default CardGoals;