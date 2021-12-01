import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../../helpers/responsiveness';
import { metrics } from '../../../../../styles';
import { useTheme } from 'styled-components/native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const CardPlaceholder: React.FC = () => {
  const theme: any = useTheme();
  return (
    <View
      style={{
        flex: 1,
        opacity: 0.4,
        position: 'relative',
      }}>
      <SkeletonContent
        containerStyle={{ width: '100%' }}
        animationDirection="horizontalLeft"
        boneColor={theme.colors.platinum}
        highlightColor={theme.colors.white}
        layout={[
          {
            width:
              metrics.screen.width - (metrics.default.boundaries / 1.6) * 2,
            height: widthPixel(830),
            borderRadius: widthPixel(24),
          },
        ]}
        isLoading={true}
      />
      <SkeletonContent
        containerStyle={{ position: 'absolute', alignSelf: 'center' }}
        animationDirection="horizontalLeft"
        boneColor={theme.colors.white}
        highlightColor={theme.colors.white}
        layout={[
          {
            position: 'absolute',
            alignSelf: 'center',
            width: widthPixel(500),
            height: widthPixel(500),
            borderRadius: widthPixel(500 / 2),
            top: (widthPixel(830) - widthPixel(500)) / 2,
          },
        ]}
        isLoading={true}
      />
    </View>
  );
};

export default CardPlaceholder;
