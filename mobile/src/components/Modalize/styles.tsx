import Styled from 'styled-components/native';
import { metrics, colors, fonts } from '../../styles';

export const Boundaries = Styled.View`
    padding: ${`${metrics.default.boundaries}px`}
`;

export const Title = Styled.Text`
    font-size: ${`${fonts.size.big}px`};
    font-family: ${fonts.familyType.bold};
    color: ${colors.davysGrey};
`;
