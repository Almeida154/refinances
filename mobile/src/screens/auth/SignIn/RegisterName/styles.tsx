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

export const Content = styled.View`
    height: 100%;
    display: flex;
    align-items: center;
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
    justify-content: space-between;
    align-items: center;
`;

export const TextButton = styled.Text`
    font-family: 'Nunito-Bold';
    font-size: 22px;
    opacity: .25;
`;