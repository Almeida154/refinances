import React from 'react';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { useTheme } from 'styled-components/native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const BalancePlaceholder: React.FC = () => {
  const theme: any = useTheme();
  return (
    <SkeletonContent
      isLoading
      animationDirection="horizontalLeft"
      boneColor={theme.colors.platinum}
      highlightColor={theme.colors.white}
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.4,
      }}
      layout={[
        {
          width: widthPixel(120),
          height: widthPixel(60),
          bottom: heightPixel(5),
          position: 'absolute',
        },
        {
          width: widthPixel(200),
          height: widthPixel(60),
          top: heightPixel(5),
          position: 'absolute',
        },
      ]}
    />
  );
};

export default BalancePlaceholder;
