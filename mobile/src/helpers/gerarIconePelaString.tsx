import React from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconZocial from 'react-native-vector-icons/Zocial';

type PropsIcon = {
  stringIcon: string;
  color: string;
  size: number;
};

const Icon = ({ stringIcon, color, size }: PropsIcon) => {
  console.debug("Icon | entrou")
  stringIcon = stringIcon != undefined ? stringIcon : 'MaterialIcons:error';
  const [lib, icon] = stringIcon.split(':');

  switch (lib) {
    case 'AntDesign':
      return (
        <IconAntDesign
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'Entypo':
      return (
        <IconEntypo
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'EvilIcons':
      return (
        <IconEvilIcons
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'Feather':
      return (
        <IconFeather
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'FontAwesome':
      return (
        <IconFontAwesome
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'FontAwesome5':
      return (
        <IconFontAwesome5
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'FontAwesome5Pro':
      return (
        <IconFontAwesome5Pro
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'Ionicons':
      return (
        <IconIonicons
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'Foundation':
      return (
        <IconFoundation
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'Fontisto':
      return (
        <IconFontisto
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'MaterialCommunityIcons':
      return (
        <IconMaterialCommunityIcons
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'MaterialIcons':
      return (
        <IconMaterialIcons
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'Octicons':
      return (
        <IconOcticons
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'SimpleLineIcons':
      return (
        <IconSimpleLineIcons
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    case 'Zocial':
      return (
        <IconZocial
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name={icon}
        />
      );
    default:
      return (
        <IconMaterialIcons
          style={{ opacity: 0.4 }}
          color={color}
          size={size}
          name="error"
        />
      );
  }
};

export default Icon;
