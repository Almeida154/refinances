import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../helpers/responsiveness';
import { metrics } from '../../../../styles';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const Placeholder: React.FC = () => {
  return (
    // <View style={{ marginBottom: metrics.default.boundaries, opacity: 0.4 }}>
    //   <SkeletonContent isLoading>
    //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //       <View
    //         style={{
    //           width: widthPixel(160),
    //           height: widthPixel(160),
    //           borderRadius: widthPixel(160 / 2),
    //         }}
    //       />
    //       <View style={{ marginLeft: 20 }}>
    //         <View
    //           style={{
    //             width: widthPixel(520),
    //             height: 20,
    //             borderRadius: 4,
    //           }}
    //         />
    //         <View
    //           style={{
    //             marginTop: 6,
    //             width: widthPixel(300),
    //             height: 20,
    //             borderRadius: 4,
    //           }}
    //         />
    //       </View>
    //     </View>
    //   </SkeletonContent>
    // </View>

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

export default Placeholder;
