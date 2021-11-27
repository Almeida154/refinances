import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../../../../styles';

export const GeneralStatsCard = styled.View`
  position: relative;
  height: ${`${heightPixel(1000)}px`};
  background-color: ${colors.diffWhite};
  border-radius: ${`${widthPixel(24)}px`};
`;

export const GeneralStatsHeader = styled.View`
  flex-direction: row;
  position: absolute;
  align-items: flex-end;
  top: 0;
  width: 100%;
  height: ${`${heightPixel(125)}px`};
  padding: 0 ${`${metrics.default.boundaries / 1.6}px`};
`;

export const GeneralStatsName = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  color: ${colors.davysGrey};
  opacity: 0.7;
`;

export const GeneralStatsBody = styled.View`
  margin-top: ${`${heightPixel(125)}px`};
  height: ${`${heightPixel(1000 - 250 - 125)}px`};
  padding: ${`${metrics.default.boundaries / 1.6}px`};
`;

export const GeneralStatsFooter = styled(GeneralStatsCard)`
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${`${heightPixel(250)}px`};
  background-color: ${colors.white};
`;

export const GeneralStatsFooterItem = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const GSFIBalance = styled.Text`
  font-size: ${`${fonts.size.medium - widthPixel(6)}px`};
  font-family: ${fonts.familyType.black};
`;

export const GSFIDescription = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.bold};
  color: ${colors.davysGrey};
  margin-top: ${`${heightPixel(-10)}px`};
  opacity: 0.4;
`;
