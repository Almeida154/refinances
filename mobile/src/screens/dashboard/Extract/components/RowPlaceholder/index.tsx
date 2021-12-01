import React from 'react';
import { View } from 'react-native';

import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { metrics } from '../../../../../styles';
import { useTheme } from 'styled-components/native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const RowPlaceholder: React.FC<any> = ({ width = 300, marginTop = 60 }) => {
  const theme: any = useTheme();
  return (
    <View
      style={{
        flex: 1,
        marginBottom: metrics.default.boundaries,
        flexDirection: 'row',
        opacity: 0.4,
      }}>
      <SkeletonContent
        containerStyle={{
          width: '50%',
          marginTop: heightPixel(marginTop),
        }}
        animationDirection="horizontalLeft"
        boneColor={theme.colors.platinum}
        highlightColor={theme.colors.white}
        isLoading
        layout={[
          {
            width: widthPixel(width),
            height: widthPixel(60),
          },
        ]}
      />
    </View>
  );
};

export default RowPlaceholder;
