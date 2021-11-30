import styled from "styled-components/native"

import {fonts, colors, metrics} from "../../../../../../../styles"
import { widthPixel, heightPixel } from "../../../../../../../helpers/responsiveness"

export const Title = styled.Text `
    marginTop: ${heightPixel(100)};
    fontSize: ${`${fonts.size.super}px`};
    color: ${colors.davysGrey};
    fontFamily: ${`${fonts.familyType.bold}`};
    textAlign: center;
`
export const Container = styled.View`
    padding-top: ${`${metrics.default.statusBarHeight}px`};
`

export const InputController = styled.View `
    padding: 10% 10% 0 10%;
`