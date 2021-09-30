import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'

import {Parcela} from '../../../../../contexts/InstallmentContext'
import {UseTransferencias, Transferencia} from '../../../../../contexts/TransferContext'

import CardInstallment from '../CardInstallment'
import CardTransfer from '../CardTransfer'

import converterDataParaManuscrito from '../../../../../helpers/converterDataParaManuscrito'

import {
    Container,
    HeaderDate,
    LabelDate,
    BodyEntries
} from './styles'

type PropsSectionByDate = {
    date: string,
    parcelas: Parcela[],
    transferencias: Transferencia[]
}

const SectionByDate = ({date, parcelas, transferencias}: PropsSectionByDate) => {    
        
    let temTransferencias = true
    let temParcelas = true

    try {
        transferencias.map(item => {})
    } catch (error) {
        temTransferencias = false
    }
        
    try {
        parcelas.map(item => {})
    } catch (error) {
        temParcelas = false
    }
    return (
        <Container>
            <HeaderDate>
                <LabelDate>{converterDataParaManuscrito(date)}</LabelDate>
            </HeaderDate>
            <BodyEntries>
                {
                    temParcelas && parcelas.map((item, index) =>
                        <CardInstallment item={item} key={index}/>
                    )

                }
                {
                    temTransferencias && transferencias.map((item, index) =>
                        <CardTransfer item={item} key={-index}/>
                    )
                }
            </BodyEntries>
        </Container>
    )
}

export default SectionByDate