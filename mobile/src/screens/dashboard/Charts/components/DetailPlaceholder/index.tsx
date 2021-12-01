import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../../helpers/responsiveness';
import { metrics } from '../../../../../styles';
import { useTheme } from 'styled-components/native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const DetailPlaceholder: React.FC = () => {
  const theme: any = useTheme();
  return (
    <View
      style={{
        opacity: 0.4,
      }}>
      <SkeletonContent
        containerStyle={{ width: '100%', justifyContent: 'center' }}
        animationDirection="horizontalLeft"
        boneColor={theme.colors.platinum}
        highlightColor={theme.colors.white}
        layout={[
          {
            width: widthPixel(160),
            height: widthPixel(60),
            marginBottom: widthPixel(10),
          },
          {
            width: widthPixel(280),
            height: widthPixel(60),
          },
        ]}
        isLoading={true}
      />
    </View>
  );
};

export default DetailPlaceholder;
