import React from 'react'

import {Transferencia} from '../../../../../contexts/TransferContext'
import { useTheme } from 'styled-components/native'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {colors, fonts, metrics} from '../../../../../styles'
import {
    ContainerItem,
    SectionIcon,
    SectionDescription,
    LabelName,
    LabelAccounts,
    SectionTransfer,
    SectionValues,
    LabelValue
} from './styles'

type CardTransferProps = {
    item: Transferencia
}

const CardTransfer = ({item}: CardTransferProps) => {
    
    const theme: any = useTheme()
    
    return(
        <ContainerItem>
            <SectionTransfer>
                <SectionIcon style={{borderColor: 'yellow'   }}>
                    <Icon size={24} color='gray' name="bank-transfer"/>
                </SectionIcon>
                <SectionDescription>
                    <LabelName>{item.descricaoTransferencia}</LabelName>
                    <LabelAccounts>{item.contaOrigem.descricao} {'>'} {item.contaDestino.descricao}</LabelAccounts>
                </SectionDescription>
            </SectionTransfer>

            
            <SectionValues>
                <LabelValue style={{color: theme.colors.jet}}>{item.valorTransferencia}</LabelValue>                
            </SectionValues>
        </ContainerItem>
    )
}

export default CardTransfer