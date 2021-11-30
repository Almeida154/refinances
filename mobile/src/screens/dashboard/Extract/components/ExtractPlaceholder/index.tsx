import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../../helpers/responsiveness';
import { colors, metrics } from '../../../../../styles';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const ExtractPlaceholder: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        marginBottom: metrics.default.boundaries,
        flexDirection: 'row',
        opacity: 0.3,
      }}>
      <SkeletonContent
        containerStyle={{ width: widthPixel(135), marginRight: 20 }}
        animationDirection="horizontalLeft"
        boneColor={colors.platinum}
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
        boneColor={colors.platinum}
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
    </View>
  );
};

export default ExtractPlaceholder;
