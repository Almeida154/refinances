import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { fonts } from '../../../../../styles';

export const ContainerItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${`${heightPixel(40)}px`};
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

export const SectionTransfer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LabelName = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props: any) => props.theme.colors.darkGray};
  opacity: 0.7;
`;

export const SectionValues = styled.Text`
  flex-flow: column wrap;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: ${`${heightPixel(-10)}px`};
`;

export const LabelAccounts = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.semiBold};
  color: ${(props: any) => props.theme.colors.silver};
`;

export const LabelValue = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  margin-bottom: ${`${heightPixel(-10)}px`};
`;
