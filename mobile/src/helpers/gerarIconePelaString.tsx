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
  stringIcon = stringIcon != undefined ? stringIcon : 'MaterialIcons:error';
  const [lib, icon] = stringIcon.split(':');

  switch (lib) {
    case 'AntDesign':
      return <IconAntDesign color={color} size={size} name={icon} />;
    case 'Entypo':
      return <IconEntypo color={color} size={size} name={icon} />;
    case 'EvilIcons':
      return <IconEvilIcons color={color} size={size} name={icon} />;
    case 'Feather':
      return <IconFeather color={color} size={size} name={icon} />;
    case 'FontAwesome':
      return <IconFontAwesome color={color} size={size} name={icon} />;
    case 'FontAwesome5':
      return <IconFontAwesome5 color={color} size={size} name={icon} />;
    case 'FontAwesome5Pro':
      return <IconFontAwesome5Pro color={color} size={size} name={icon} />;
    case 'Ionicons':
      return <IconIonicons color={color} size={size} name={icon} />;
    case 'Foundation':
      return <IconFoundation color={color} size={size} name={icon} />;
    case 'Fontisto':
      return <IconFontisto color={color} size={size} name={icon} />;
    case 'MaterialCommunityIcons':
      return (
        <IconMaterialCommunityIcons color={color} size={size} name={icon} />
      );
    case 'MaterialIcons':
      return <IconMaterialIcons color={color} size={size} name={icon} />;
    case 'Octicons':
      return <IconOcticons color={color} size={size} name={icon} />;
    case 'SimpleLineIcons':
      return <IconSimpleLineIcons color={color} size={size} name={icon} />;
    case 'Zocial':
      return <IconZocial color={color} size={size} name={icon} />;
    default:
      return <IconMaterialIcons color={color} size={size} name="error" />;
  }
};

export default Icon;
