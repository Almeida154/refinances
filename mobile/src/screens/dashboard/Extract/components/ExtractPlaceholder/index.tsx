import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../../helpers/responsiveness';
import { metrics } from '../../../../../styles';
import { useTheme } from 'styled-components/native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const ExtractPlaceholder: React.FC = () => {
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
        containerStyle={{ width: widthPixel(135), marginRight: 20 }}
        animationDirection="horizontalLeft"
        boneColor={theme.colors.platinum}
        highlightColor={theme.colors.white}
        layout={[
          {
            width: widthPixel(135),
            height: widthPixel(135),
            borderRadius: widthPixel(135) / 2,
          },
        ]}
        isLoading={true}
      />
      <SkeletonContent
        containerStyle={{ width: '50%' }}
        animationDirection="horizontalLeft"
        boneColor={theme.colors.platinum}
        highlightColor={theme.colors.white}
        layout={[
          {
            marginBottom: widthPixel(15),
            width: widthPixel(420),
            height: widthPixel(60),
          },
          {
            width: widthPixel(260),
            height: widthPixel(60),
          },
        ]}
        isLoading={true}
      />
      <SkeletonContent
        animationDirection="horizontalLeft"
        boneColor={theme.colors.platinum}
        highlightColor={theme.colors.white}
        layout={[
          {
            right: widthPixel(10),
            position: 'absolute',
            width: widthPixel(100),
            height: widthPixel(60),
          },
        ]}
        isLoading={true}
      />
    </View>
  );
};

export default ExtractPlaceholder;
