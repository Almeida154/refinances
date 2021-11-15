import React from 'react';
import { View } from 'react-native';

import { widthPixel } from '../../../../helpers/responsiveness';
import { metrics } from '../../../../styles';

const Placeholder: React.FC = () => {
  return (
    <View style={{ marginBottom: metrics.default.boundaries, opacity: 0.4 }}>
      
    </View>
  );
};

export default Placeholder;
