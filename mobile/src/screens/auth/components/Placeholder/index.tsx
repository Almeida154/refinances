import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../helpers/responsiveness';
import { metrics } from '../../../../styles';

const Placeholder: React.FC = () => {
  return (
    <View style={{ marginBottom: metrics.default.boundaries, opacity: 0.4 }}>
      {/* <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            width={widthPixel(160)}
            height={widthPixel(160)}
            borderRadius={widthPixel(160 / 2)}
          />
          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={widthPixel(520)}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={widthPixel(300)}
              height={20}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder> */}
    </View>
  );
};

export default Placeholder;
