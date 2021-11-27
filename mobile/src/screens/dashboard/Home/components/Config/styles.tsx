import styled from "styled-components/native"
import { colors, fonts, metrics } from "../../../../../styles"

import { widthPixel, heightPixel } from "../../../../../helpers/responsiveness"

export const Container = styled.View`
    height: auto;
`

export const ContainerBody = styled.View`
    width: 100%;
    height: auto;
`

export const ContainerScroll = styled.ScrollView`
    height: 100%;
    color: ${colors.cultured};
    height: auto;
`

export const ContainerProfile = styled.View`
    alignItems: center;
    justify-content: center;
`

export const Profile = styled.Image`
    width: ${widthPixel(300)};
    height: ${heightPixel(330)};
    borderRadius: ${widthPixel(250)};;
    borderColor: ${colors.bigDipOruby};
    borderWidth: 4;
    justify-content: center;
    position: absolute;
`

export const HeaderContainer = styled.View`
    backgroundColor: ${colors.bigDipOruby};
    height: ${heightPixel(550)};
    display: flex;
`

export const TitleFooter = styled.Text `
    fontSize: ${`${fonts.size.big}px`};
    color: ${colors.paradisePink}
    fontFamily: ${`${fonts.familyType.bold}`};
`

export const Title = styled.Text `
    fontSize: ${`${fonts.size.big}px`};
    color: ${colors.darkGray}
    fontFamily: ${`${fonts.familyType.bold}`};
`

export const MainTitle = styled.Text `
    fontSize: ${`${fonts.size.big}px`};
    color: ${colors.paradisePink};
    line-height: ${heightPixel(150)};
    background-color: ${colors.platinum};
    fontFamily: ${`${fonts.familyType.bold}`};
    padding-left: ${widthPixel(30)};
`

export const Subtitle = styled.Text `
    fontSize: ${`${fonts.size.medium}px`};
    color: ${colors.darkGray}
    fontFamily: ${`${fonts.familyType.bold}`};
    opacity: 0.5;
`

export const SubtitleFooter = styled.Text `
    fontSize: ${`${fonts.size.medium}px`};
    color: ${colors.darkGray}
    fontFamily: ${`${fonts.familyType.bold}`};
    opacity: 0.5;
    text-align: center
`

export const Copyright = styled.Text `
    fontSize: ${`${fonts.size.small}px`};
    color: ${colors.darkGray}
    fontFamily: ${`${fonts.familyType.bold}`};
    opacity: 0.5;
`

export const ContainerItems = styled.View`
    flexDirection: row;
    width: 100%;
    top: ${heightPixel(70)}
    height: ${heightPixel(170)};
    
`

export const Item = styled.View`
    flexDirection: column;
    width: 70%;
    left: ${widthPixel(30)};
    flex: 1;
    bottom: ${widthPixel(30)};
`

export const Footer = styled.View`
    width: 100%;
    height: ${heightPixel(700)}
    bottom: ${widthPixel(30)};
    justify-content: center;
    align-items: center;
    background-color: ${colors.platinum};
`

export const SectionIcons = styled.View`
    width: 100%;
    margin: ${heightPixel(50)}px;
    flex-direction: row;
    justify-content: center;
`

export const Icon = styled.View`
    margin: ${heightPixel(30)}px;
    background-color: ${colors.silver}
    padding: ${heightPixel(10)}px;
    border-radius: 20px;
    justify-content: center;
`

export const SectionIconLeft = styled.View`
    width: 15%;
    padding-left: ${widthPixel(50)}
    justify-content: center;
`

export const SectionIconRight = styled.View`
    width: 15%;
    padding-right: ${widthPixel(50)};
    justify-content: center;
    align-items: center;
`

export const Separator = styled.View`
    width: 100%;
    height: 2px;
    background-color: ${colors.platinum};
    margin-top: ${heightPixel(20)};
`