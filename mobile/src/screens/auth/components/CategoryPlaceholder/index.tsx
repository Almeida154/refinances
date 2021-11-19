import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../helpers/responsiveness';
import { metrics } from '../../../../styles';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const CategoryPlaceholder: React.FC = () => {
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
        layout={[
          {
            width: widthPixel(260),
            height: widthPixel(60),
            marginBottom: widthPixel(15),
          },
          {
            width: widthPixel(520),
            height: widthPixel(60),
          },
        ]}
        isLoading={true}
      />
    </View>
  );
};

export default CategoryPlaceholder;
