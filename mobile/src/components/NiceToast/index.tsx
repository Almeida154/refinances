// Toast dos cria

import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { colors } from '../../styles';
import { Container, StatusBarDetail, Title, Message } from './styles';

interface IProps {
  type: string;
  title: string;
  message?: string;
  detailed?: boolean;
}

const NiceToast: React.FC<IProps> = ({ type, title, message, detailed }) => {
  var backgroundColor;
  var icon;
  const theme: any = useTheme()
  switch (type) {
    case 'success':
      backgroundColor = colors.slimyGreen;
      icon = <AntDesign name="checkcircleo" size={24} color={"#fff"} />;
      break;
    case 'error':
      backgroundColor = colors.redCrayola;
      icon = <MaterialIcons name="error-outline" size={28} color={"#fff"} />;
      break;
    case 'warning':
      backgroundColor = colors.deepSafron;
      icon = <Ionicons name="warning-outline" size={26} color={"#fff"} />;
      break;
    case 'fake':
      backgroundColor = 'transparent';
      icon = <AntDesign name="questioncircleo" size={26} color="transparent" />;
      break;
    default:
      backgroundColor = colors.eerieBlack;
      icon = <AntDesign name="questioncircleo" size={24} color={"#fff"} />;
      break;
  }

  return (
    <View
      style={[
        {
          opacity: type == 'fake' ? 0 : 0.9,
          elevation: type == 'fake' ? 0 : 80,
          backgroundColor,
          marginTop: -10,
          paddingTop: 10,
        },
      ]}>
      <StatusBarDetail
        style={{ backgroundColor: detailed ? backgroundColor : 'transparent' }}
      />
      <Container activeOpacity={1}>
        {icon}
        <View>
          {title && <Title>{title}</Title>}
          {message && <Message>{message}</Message>}
        </View>
      </Container>
    </View>
  );
};

export default NiceToast;
