import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'

import {Lancamento} from '../../../../../contexts/EntriesContext'
import {UseTransferencias, Transferencia} from '../../../../../contexts/TransferContext'

import CardEntry from '../CardEntry'
import CardTransfer from '../CardTransfer'

import {
    Container,
    HeaderDate,
    LabelDate,
    BodyEntries
} from './styles'

type PropsSectionByDate = {
    date: string,
    lancamentos: Lancamento[],
    transferencias: Transferencia[]
}

const SectionByDate = ({date, lancamentos, transferencias}: PropsSectionByDate) => {    
    
    return (
        <Container>
            <HeaderDate>
                <LabelDate>{date}</LabelDate>
            </HeaderDate>
            <BodyEntries>
                {
                    lancamentos.map((item, index) =>
                        <CardEntry item={item} key={index}/>
                    )

                }
                {
                    transferencias.map((item, index) =>
                        <CardTransfer item={item} key={index}/>
                    )
                }
            </BodyEntries>
        </Container>
    )
}

export default SectionByDate