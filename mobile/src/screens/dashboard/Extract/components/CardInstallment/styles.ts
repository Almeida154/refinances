import styled from 'styled-components/native';

import { colors, fonts, metrics } from '../../../../../styles';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';

export const ContainerItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${`${heightPixel(20)}px`};
  width: 100%;
`;

export const SectionIcon = styled.View`
  width: ${`${widthPixel(140)}px`};
  height: ${`${widthPixel(140)}px`};
  border-width: ${`${widthPixel(10)}px`};
  border-radius: ${`${widthPixel(140 / 2)}px`};
  justify-content: center;
  align-items: center;
  margin-right: ${`${widthPixel(30)}px`};
`;

export const SectionDescription = styled.View`
  height: 100%;
`;

export const SectionLancamento = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LabelName = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  color: ${colors.darkGray};
  opacity: 0.7;
`;

export const SectionValues = styled.View`
  flex-flow: column wrap;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: ${`${heightPixel(-10)}px`};
`;

export const LabelValue = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  margin-bottom: ${`${heightPixel(-10)}px`};
`;

export const SectionCheck = styled.View`
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-top: ${`${heightPixel(-10)}px`};
`;

export const EditLabel = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  line-height: ${`${fonts.size.small + widthPixel(10)}px`};
  color: ${colors.davysGrey};
  font-family: ${`${fonts.familyType.semiBold}`};
  opacity: 0.7;
`;

export const LabelAccount = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.semiBold};
  color: ${colors.silver};
`;

export const LabelIndex = styled.Text`
  font-family: ${fonts.familyType.semiBold};
  font-size: ${`${fonts.size.medium}px`};
  margin-right: ${`${heightPixel(50)}px`};
  color: ${colors.davysGrey};
  margin-bottom: ${`${heightPixel(17)}px`};
  background-color: brown;
`;
