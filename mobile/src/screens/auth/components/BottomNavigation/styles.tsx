import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.TouchableHighlight`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const Content = styled.View`
  background-color: ${(props : any) => props.theme.colors.white};
  flex-direction: row;
  height: 80px;
  padding: 0 ${`${metrics.default.boundaries}px`};
  justify-content: center;
  align-items: center;
`;

interface DescriptionProps {
  lowOpacity?: boolean;
}

export const Description = styled.Text<DescriptionProps>`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big}px`};
  color: ${(props : any) => props.theme.colors.davysGrey};
  opacity: ${props => (props.lowOpacity ? 0.25 : 1)};
  flex: 1;
`;
