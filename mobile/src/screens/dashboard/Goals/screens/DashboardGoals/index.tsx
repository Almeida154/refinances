
import React from 'react';
import { Image, StatusBar, StyleSheet, View,  } from 'react-native';

import  PropsNavigationApp from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../../../../components/Button';
import { Goal } from '../TabNavigator/styles';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
//import image from './img/goal.png';

import {
  TextGoals,
  Title,
  SectionImage
} from './styles';

type Props = NativeStackScreenProps<PropsNavigationApp, 'Metas'>;

const Goals = ({ navigation }: Props) => {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} />

      <Title>
          Bem-vindo(a) às suas 
          <TextGoals> metas! {'\n'}</TextGoals>
          Aqui você pode gerenciá-las como preferir. Visualizar as existentes ou criar novas.
      </Title>

      <SectionImage>
        {/*<Image source={require('./img/goal.png')} style={{resizeMode: "center", width: 100}}/>*/}
      </SectionImage>

        <Button
          title={'Metas atuais'}
          style={{ marginTop: 20,
            backgroundColor: "#F5F2F3"}}
          color="#ee4266"
          onPress={() => {}}/>

        <Button
          title={'Metas concluídas'}
          style={{ marginTop: 20,
             backgroundColor: "#F5F2F3"}}
          onPress={() => {}}
          color="#6CB760"
          />

        <Button
          title={'Nova meta'}
          style={{ marginTop: 20,
            backgroundColor: "#F5F2F3"}}
          color="#888"
          onPress={() => {}}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '10%',
    backgroundColor: '#fff',
    height: '100%'
  },
});

export default Goals;
