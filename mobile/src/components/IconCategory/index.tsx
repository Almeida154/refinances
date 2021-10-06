import React from 'react'

import Icon from '../../helpers/gerarIconePelaString'

import {
    SectionIcon
} from './styles'

type PropsIconCategory = {
    stringIcon: string,
    color: string
}

const IconCategory = ({stringIcon, color}: PropsIconCategory) => {
    return (
        <SectionIcon>
            <Icon size={30} stringIcon={stringIcon} color={color}/>
        </SectionIcon>
    )
}

export default IconCategory