import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    padding-top: ${`${StatusBar.currentHeight}px`};
    font-family: "Nunito-Italic";
    height: 100%;
    width: 100%;
    background-color: #f6f6f6;
`;

export const Boundaries = styled.View`
    position: relative;
    padding-right: 30px;
    padding-left: 30px;
    height: 100%;
`;

export const Header = styled.View`
    padding-top: 50px;
`;

export const Title = styled.Text`
    font-family: 'Nunito-Bold';
    color: #EE4266;
    padding-top: 20px;
    font-size: 32px;
    line-height: 36px;
`;

export const SubTitle = styled(Title)`
    padding-top: 0px;
    font-size: 18px;
    opacity: .7;
`;

export const Content = styled.View`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

export const NextButton = styled.TouchableHighlight`
    height: 10%;
    width: ${`${(Dimensions.get('window').width)}px`};
    bottom: 0;
    position: absolute;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #fff;
    elevation: 20;
`;

export const ContainerNextButtonContent = styled.View`
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const TextButton = styled.Text`
    font-family: 'Nunito-Bold';
    font-size: 22px;
    opacity: .25;
`;

export const Card = styled.View`
    width: 100%;
    border-width: 1.6px;
    border-radius: 10px;
    padding: 20px;
    border-color: #0000001c;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const CardTitle = styled.Text`
    font-family: 'Nunito-Bold';
    font-size: 22px;
`;

export const CardLine = styled.View`
    width: 100%;
    height: 1.6px;
    background-color: #0000001c;
    margin-top: 14px;
    border-radius: 2px;
`;

export const CardDescription = styled(CardTitle)`
    opacity: .6;
    font-size: 18px;
    margin-top: 14px;
`;

export const CardButtonContainer = styled.View`
    margin-top: 22px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

export const CardButton = styled.TouchableHighlight`
    background-color: #EE4266;
    width: 40%;
    border-radius: 30px;
    padding: 10px;
    align-items: center;
`;

export const TextCardButton = styled.Text`
    font-family: 'Nunito-Bold';
    font-size: 22px;
    color: #fff;
`;