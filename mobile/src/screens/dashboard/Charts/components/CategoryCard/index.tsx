import React, { useState } from 'react';
import { processColor, View } from 'react-native';

import doubleToCurrency from '../../../../../helpers/doubleToCurrency';
import shadowBox from '../../../../../helpers/shadowBox';

import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../../../../styles';

import { PieChart } from 'react-native-charts-wrapper';

import {
  CategoryStatsCard,
  CategoryStatsHeader,
  CategoryStatsName,
  CategoryStatsBody,
  CategoriesContainer,
  Category,
  CategoryIcon,
  CategoryName,
  CategoryData,
  Total,
  Percent,
  Name,
} from './styles';
import hexToRGB from '../../../../../helpers/hexToRgba';
import Icon from '../../../../../helpers/gerarIconePelaString';
import Button from '../../../../../components/Button';

type CategoryStat = {
  accent: string;
  icon: string;
  name: string;
  total: number;
};

interface IProps {
  name?: string;
  categories?: CategoryStat[];
}

const CategoryCard: React.FC<IProps> = ({ name, categories }) => {
  const [data, setData] = useState({
    dataSets: [
      {
        values: [
          { value: 2400, label: 'Educação' },
          { value: 235, label: 'Outfit' },
          { value: 140, label: 'Saúde' },
          { value: 480, label: 'Games' },
          { value: 310, label: 'Mercado' },
        ],
        config: {
          colors: [
            processColor(colors.deepSafron),
            processColor(colors.fireBrick),
            processColor(colors.rainsBlack),
            processColor(colors.budGreen),
            processColor(colors.battleGray),
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
    <CategoryStatsCard style={shadowBox(20, 0.2)}>
      <CategoryStatsHeader>
        <CategoryStatsName>{name}</CategoryStatsName>
      </CategoryStatsHeader>
      <CategoryStatsBody>
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
      </CategoryStatsBody>
      <CategoriesContainer style={shadowBox()}>
        {categories?.map((category, index) => {
          if (index > 2) return;
          return (
            <Category
              style={{
                borderTopLeftRadius: index == 0 ? widthPixel(24) : 0,
                borderTopRightRadius: index == 0 ? widthPixel(24) : 0,
                borderBottomWidth:
                  index + 1 != categories.length ? heightPixel(6) : 0,
                borderBottomColor: colors.cultured,
              }}>
              <CategoryIcon
                style={{
                  borderWidth: widthPixel(10),
                  borderColor: category.accent,
                }}>
                <Icon
                  stringIcon={category.icon}
                  color={category.accent}
                  size={widthPixel(60)}
                />
              </CategoryIcon>
              <CategoryName>
                <Name numberOfLines={1}>{category.name}</Name>
              </CategoryName>
              <CategoryData>
                <Total numberOfLines={1}>
                  {doubleToCurrency(category.total, 'pt-br', 'BRL', true)}
                </Total>
                <Percent>85,8%</Percent>
              </CategoryData>
            </Category>
          );
        })}
        <View
          style={{
            paddingHorizontal: metrics.default.boundaries / 1.6,
            paddingBottom: metrics.default.boundaries / 1.6,
          }}>
          <Button
            onPress={() => console.log('Vai pra todas')}
            style={{
              backgroundColor: colors.lightGray,
            }}
            color={hexToRGB(colors.davysGrey, 0.5)}
            title="Ver tudo"
            lastOne
          />
        </View>
      </CategoriesContainer>
    </CategoryStatsCard>
  );
};

export default CategoryCard;
