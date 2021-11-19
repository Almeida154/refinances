import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../helpers/responsiveness';
import { metrics } from '../../../../styles';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const EntryPlaceholder: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        opacity: 0.3,
      }}>
      <SkeletonContent
        containerStyle={{ width: '50%' }}
        animationDirection="horizontalLeft"
        layout={[
          {
            width: widthPixel(230),
            height: widthPixel(60),
            marginBottom: widthPixel(15),
          },
          {
            width: widthPixel(320),
            height: widthPixel(60),
          },
        ]}
        isLoading={true}
      />
    </View>
  );
};

export default EntryPlaceholder;
