import React, { useEffect, useState } from 'react';
import { processColor, Text, View } from 'react-native';

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
import { useTheme } from 'styled-components/native';

import { Categoria } from '../../../../../contexts/CategoriesContext';

type GastosCategorias = {
  totalGasto: number;
  categoria: Categoria;
};

interface IProps {
  name?: string;
  gastosCategorias?: GastosCategorias[];
  total?: number;
}

const CategoryCard: React.FC<IProps> = ({ name, gastosCategorias, total }) => {
  const theme: any = useTheme();

  const [data, setData] = useState({
    dataSets: [
      {
        values: [
          { value: 10, label: 'Educação' },
          { value: 10, label: 'Outfit' },
        ],
        config: {
          colors: [
            processColor(theme.colors.culture),
            processColor(theme.colors.eerieBlack),
          ],
          valueTextSize: 20,
          valueTextColor: processColor('transparent'),
          sliceSpace: 5,
          selectionShift: 13,
          valueFormatter: "#.#'%'",
          valueLineColor: processColor(theme.colors.white),
          valueLinePart1Length: 0.5,
        },
        label: '',
      },
    ],
  });

  useEffect(() => {
    if (gastosCategorias == undefined) return;

    var categorias = [];
    var cores = [];

    for (let i = 0; i < gastosCategorias?.length; i++) {
      if (gastosCategorias[i].categoria != undefined) {
        categorias.push({
          value: gastosCategorias[i].totalGasto,
          label: gastosCategorias[i].categoria.nomeCategoria,
        });
        cores.push(processColor(gastosCategorias[i].categoria.corCategoria));
      }
    }

    setData({
      dataSets: [
        {
          values:
            categorias.length > 0
              ? categorias
              : [
                  { value: 10, label: 'Default' },
                  { value: 10, label: 'Default' },
                ],
          config: {
            colors:
              cores.length > 0
                ? cores
                : [
                    processColor(theme.colors.rainsBlack),
                    processColor(theme.colors.darkGray),
                  ],
            valueTextSize: 20,
            valueTextColor: processColor('transparent'),
            sliceSpace: 5,
            selectionShift: 13,
            valueFormatter: "#.#'%'",
            valueLineColor: processColor(theme.colors.white),
            valueLinePart1Length: 0.5,
          },
          label: '',
        },
      ],
    });
  }, [gastosCategorias]);
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
          transparentCircleColor={processColor(
            hexToRGB(theme.colors.white, 0.1),
          )}
          maxAngle={360}
        />
      </CategoryStatsBody>
      <CategoriesContainer style={shadowBox()}>
        {gastosCategorias != undefined &&
          gastosCategorias?.map((gastoCateg, index) => {
            if (index < 2 && gastoCateg.categoria != undefined)
              return (
                <Category
                  key={index}
                  style={{
                    borderTopLeftRadius: index == 0 ? widthPixel(24) : 0,
                    borderTopRightRadius: index == 0 ? widthPixel(24) : 0,
                    borderBottomWidth:
                      index + 1 != gastosCategorias.length ? heightPixel(6) : 0,
                    borderBottomColor: theme.colors.cultured,
                  }}>
                  <CategoryIcon
                    style={{
                      borderWidth: widthPixel(10),
                      borderColor: gastoCateg.categoria.corCategoria,
                    }}>
                    <Icon
                      stringIcon={gastoCateg.categoria.iconeCategoria}
                      color={
                        gastoCateg.categoria.corCategoria || theme.colors.white
                      }
                      size={widthPixel(60)}
                    />
                  </CategoryIcon>
                  <CategoryName>
                    <Name numberOfLines={1}>
                      {gastoCateg.categoria.nomeCategoria}
                    </Name>
                  </CategoryName>
                  <CategoryData>
                    <Total numberOfLines={1}>
                      {doubleToCurrency(
                        gastoCateg.totalGasto,
                        'pt-br',
                        'BRL',
                        true,
                      )}
                    </Total>
                    <Percent>
                      {((gastoCateg.totalGasto * 100) / (total || 1)).toFixed(
                        1,
                      )}
                      %
                    </Percent>
                  </CategoryData>
                </Category>
              );
          })}
        {gastosCategorias != undefined && gastosCategorias?.length < 1 && (
          <Text
            style={{
              padding: metrics.default.boundaries / 1.6,
              fontFamily: fonts.familyType.bold,
              fontSize: fonts.size.small,
              color: theme.colors.davysGrey,
              opacity: 0.3,
            }}>
            Nada encontrado
          </Text>
        )}
        {gastosCategorias != undefined && gastosCategorias?.length > 1 && (
          <View
            style={{
              paddingHorizontal: metrics.default.boundaries / 1.6,
              paddingBottom: metrics.default.boundaries / 1.6,
            }}>
            <Button
              onPress={() => console.log('Vai pra todas')}
              style={{
                backgroundColor: theme.colors.lightGray,
              }}
              color={hexToRGB(theme.colors.davysGrey, 0.5)}
              title="Ver tudo"
              lastOne
            />
          </View>
        )}
      </CategoriesContainer>
    </CategoryStatsCard>
  );
};

export default CategoryCard;
