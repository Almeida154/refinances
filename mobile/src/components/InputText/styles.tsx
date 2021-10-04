import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../styles';

export const Container = styled.View`
    width: 100%;
    background-color: ${colors.white};
    border-radius: ${metrics.inputText.radius};
    padding: 10px;
    elevation: 30
`;

export const Label = styled.Text`
    font-family: ${fonts.familyType.bold};
    font-size: ${fonts.size.big};
    color: ${colors.redCrayola};
    line-height: 28px;
`;

export const Input = styled.TextInput`
    font-family: ${fonts.familyType.bold};
    font-size: ${fonts.size.medium};
    color: ${colors.jet};
    padding: 0;
    margin-top: -4px;
`;