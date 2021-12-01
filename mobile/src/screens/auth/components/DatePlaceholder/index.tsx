import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../helpers/responsiveness';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { colors } from '../../../../styles';
import hexToRGB from '../../../../helpers/hexToRgba';
import { useTheme } from 'styled-components/native';
interface IProps {
  isIncome?: boolean;
}

const DatePlaceholder: React.FC<IProps> = ({ isIncome }) => {
  const theme: any = useTheme();

  return (
    <View
      style={{
        opacity: 0.6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPixel(470), // 150 + 130 + 130 = 410 + margin =  470
      }}>
      {/* First circle */}
      <SkeletonContent
        highlightColor={hexToRGB(
          isIncome ? theme.colors.lincolnGreen : theme.colors.diffWhite,
          0.7,
        )}
        boneColor={hexToRGB(
          isIncome ? theme.colors.lincolnGreen : theme.colors.diffWhite,
          0.7,
        )}
        animationDirection="horizontalLeft"
        layout={[
          {
            width: widthPixel(130),
            height: widthPixel(130),
            borderRadius: widthPixel(130) / 2,
          },
        ]}
        isLoading={true}
      />

      {/* Second circle */}
      <SkeletonContent
        highlightColor={hexToRGB(
          isIncome ? theme.colors.lincolnGreen : theme.colors.davysGray,
          0.7,
        )}
        boneColor={hexToRGB(
          isIncome ? theme.colors.lincolnGreen : theme.colors.davysGray,
          0.7,
        )}
        animationDirection="horizontalLeft"
        layout={[
          {
            width: widthPixel(150),
            height: widthPixel(150),
            borderRadius: widthPixel(150) / 2,
          },
        ]}
        isLoading={true}
      />

      {/* Third circle */}
      <SkeletonContent
        highlightColor={hexToRGB(
          isIncome ? theme.colors.lincolnGreen : theme.colors.davysGray,
          0.7,
        )}
        boneColor={hexToRGB(
          isIncome ? theme.colors.lincolnGreen : theme.colors.davysGray,
          0.7,
        )}
        animationDirection="horizontalLeft"
        layout={[
          {
            width: widthPixel(130),
            height: widthPixel(130),
            borderRadius: widthPixel(130) / 2,
          },
        ]}
        isLoading={true}
      />
    </View>
  );
};

export default DatePlaceholder;
