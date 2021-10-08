import React from 'react';
import { View, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        onPress={() => {
          navigation.navigate('TopTabNav');
        }}
        title="Metas"
      />
    </View>
  );
};

export default Home;
