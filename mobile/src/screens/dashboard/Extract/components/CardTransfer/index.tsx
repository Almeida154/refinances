import React from 'react'

import {Transferencia} from '../../../../../contexts/TransferContext'

import {
    ContainerItem,
    SectionIcon,
    SectionDescription,
    LabelName,
    LabelAccounts,
    SectionValues,
    LabelValue
} from './styles'

type CardTransferProps = {
    item: Transferencia
}

const CardTransfer = ({item}: CardTransferProps) => {
    return(
        <ContainerItem>
            <SectionIcon>

            </SectionIcon>

            <SectionDescription>
                <LabelName>{item.descricaoTransferencia}</LabelName>
                <LabelAccounts>{item.contaOrigem.descricaoConta} {'>'} {item.contaDestino.descricaoConta}</LabelAccounts>
            </SectionDescription>

            
            <SectionValues>
                <LabelValue>{item.valorTransferencia}</LabelValue>                
            </SectionValues>
        </ContainerItem>
    )
}

export default CardTransfer