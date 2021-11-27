import React, { useState } from 'react';
import { processColor } from 'react-native';

import doubleToCurrency from '../../../../../helpers/doubleToCurrency';
import shadowBox from '../../../../../helpers/shadowBox';

import { widthPixel } from '../../../../../helpers/responsiveness';
import { colors, fonts } from '../../../../../styles';

import { PieChart } from 'react-native-charts-wrapper';

import {
  GeneralStatsCard,
  GeneralStatsHeader,
  GeneralStatsName,
  GeneralStatsBody,
  GeneralStatsFooter,
  GeneralStatsFooterItem,
  GSFIBalance,
  GSFIDescription,
} from './styles';
import hexToRGB from '../../../../../helpers/hexToRgba';

interface IProps {
  name?: string;
}

const GeneralCard: React.FC<IProps> = ({ name }) => {
  const [data, setData] = useState({
    dataSets: [
      {
        values: [
          { value: 14997, label: 'Quanto ganha' },
          { value: 2795.3, label: 'Quanto gasta' },
        ],
        config: {
          colors: [
            processColor(colors.slimyGreen),
            processColor(colors.redCrayola),
          ],
          valueTextSize: 20,
          valueTextColor: processColor('transparent'),
          sliceSpace: 5,
          selectionShift: 13,
          valueFormatter: "#.#'%'",
          valueLineColor: processColor(colors.white),
          valueLinePart1Length: 0.5,
        },
        label: '',
      },
    ],
  });

  return (
    <GeneralStatsCard style={shadowBox(20, 0.2)}>
      <GeneralStatsHeader>
        <GeneralStatsName>{name}</GeneralStatsName>
      </GeneralStatsHeader>
      <GeneralStatsBody>
        <PieChart
          style={{
            flex: 1,
            width: widthPixel(800),
            alignSelf: 'center',
            margin: 0,
            padding: 0,
          }}
          logEnabled={false}
          data={data}
          legend={{ enabled: false }}
          extraOffsets={{ left: 5, top: 5, right: 5, bottom: 5 }}
          entryLabelColor={processColor('transparent')}
          entryLabelTextSize={fonts.size.medium}
          entryLabelFontFamily={fonts.familyType.black}
          drawEntryLabels={false}
          rotationEnabled
          rotationAngle={180}
          usePercentValues={true}
          styledCenterText={{ text: '' }}
          centerTextRadiusPercent={80}
          holeRadius={40}
          chartDescription={{ text: '' }}
          holeColor={processColor('transparent')}
          transparentCircleRadius={45}
          transparentCircleColor={processColor(hexToRGB(colors.white, 0.1))}
          maxAngle={360}
        />
      </GeneralStatsBody>
      <GeneralStatsFooter style={shadowBox()}>
        <GeneralStatsFooterItem>
          <GSFIBalance style={{ color: colors.slimyGreen }}>
            {doubleToCurrency(14997, 'pt-br', 'BRL', true)}
          </GSFIBalance>
          <GSFIDescription>de receitas</GSFIDescription>
        </GeneralStatsFooterItem>
        <GeneralStatsFooterItem
          style={{
            borderLeftWidth: widthPixel(4),
            borderLeftColor: colors.cultured,
            borderRightWidth: widthPixel(4),
            borderRightColor: colors.cultured,
          }}>
          <GSFIBalance style={{ color: colors.redCrayola }}>
            {doubleToCurrency(2795.3, 'pt-br', 'BRL', true)}
          </GSFIBalance>
          <GSFIDescription>de despesas</GSFIDescription>
        </GeneralStatsFooterItem>
        <GeneralStatsFooterItem>
          <GSFIBalance style={{ color: colors.eerieBlack }}>
            {doubleToCurrency(12201.7, 'pt-br', 'BRL', true)}
          </GSFIBalance>
          <GSFIDescription>de saldo</GSFIDescription>
        </GeneralStatsFooterItem>
      </GeneralStatsFooter>
    </GeneralStatsCard>
  );
};

export default GeneralCard;
