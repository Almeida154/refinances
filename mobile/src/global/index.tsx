import React from 'react';
import {
  BaseToast,
  ErrorToast,
  BaseToastProps,
} from 'react-native-toast-message';
import { colors, fonts } from '../styles';

export default {
  IMAGE_CROP_PICKER_OPTIONS: {
    width: 400,
    height: 400,
    cropping: true,
    includeBase64: true,
    freeStyleCropEnabled: true,
    cropperCircleOverlay: true,
    disableCropperColorSetters: true,
    useFrontCamera: true,
    showCropGuidelines: true,
    showCropFrame: true,
    hideBottomControls: true,
    enableRotationGesture: true,
    compressImageQuality: 0.8,
    mediaType: 'photo',
    cropperActiveWidgetColor: colors.redCrayola,
    cropperStatusBarColor: colors.redCrayola,
    cropperToolbarColor: colors.redCrayola,
    cropperToolbarWidgetColor: colors.redCrayola,
    cropperToolbarTitle: 'Sua foto de perfil',
  },
  TOAST_CONFIG: {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
      />
    ),
    error: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: colors.redCrayola, borderLeftWidth: 6 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: fonts.size.medium,
          fontFamily: fonts.familyType.italic,
        }}
        text2Style={{
          fontSize: fonts.size.small,
          fontFamily: fonts.familyType.semiBold,
          opacity: 0.7,
        }}
      />
    ),
  },
  DEFAULT_ICONS: [
    { description: 'Home', icon: 'FontAwesome:home' },
    { description: 'Contas', icon: 'Ionicons:documents' },
    {
      description: 'Saúde',
      icon: 'MaterialCommunityIcons:heart-pulse',
    },
    { description: 'Educação', icon: 'Octicons:mortar-board' },
    { description: 'Transporte', icon: 'FontAwesome5:bus-alt' },
    {
      description: 'Mercado',
      icon: 'MaterialIcons:local-grocery-store',
    },
    {
      description: 'Cuidado Pessoal',
      icon: 'MaterialIcons:self-improvement',
    },
    {
      description: 'Serviços',
      icon: 'MaterialCommunityIcons:palette-swatch',
    },
    {
      description: 'Felicidade',
      icon: 'MaterialCommunityIcons:emoticon-happy',
    },
    { description: 'Comida', icon: 'MaterialIcons:dinner-dining' },
    { description: 'Presente', icon: 'MaterialCommunityIcons:gift' },
    { description: 'Pessoas', icon: 'Ionicons:ios-people' },
    { description: 'Avião', icon: 'Entypo:aircraft' },
    { description: 'Cabide', icon: 'MaterialCommunityIcons:hanger' },
    { description: 'Pagamento', icon: 'MaterialIcons:payments' },
    { description: 'Pet', icon: 'FontAwesome5:dog' },
    { description: 'Gráfico', icon: 'Entypo:area-graph' },
    { description: 'Ajuda', icon: 'FontAwesome5:hands-helping' },
    { description: 'Dinheiro', icon: 'MaterialIcons:attach-money' },
    { description: 'Aperto de mão', icon: 'FontAwesome5:handshake' },
  ],
  DEFAULT_COLORS: [
    { name: 'Sandy Brown', hex: '#F4A261' },
    { name: 'Persian Green', hex: '#2A9D8F' },
    { name: 'Moss Green', hex: '#778745' },
    { name: 'Celadon Blue', hex: '#457B9D' },
    { name: 'Spanish Gray', hex: '#999999' },
    { name: 'Bright Navy Blue', hex: '#1976D2' },
    { name: 'Paradise Pink', hex: '#EF476F' },
    { name: 'Eerie Black', hex: '#161A1D' },
    { name: 'Purple', hex: '#5A189A' },
    { name: 'Imperial Red', hex: '#E5383B' },
    { name: 'Orchid Pink', hex: '#FFC4D6' },
    { name: 'Indigo Dye', hex: '#083D77' },
    { name: 'Dark Orange', hex: '#FF8811' },
    { name: 'Old Gold', hex: '#C5B400' },
    { name: 'Portland Orange', hex: '#FF6233' },
    { name: 'Liver Organ', hex: '#6A381F' },
    { name: 'Gunmetal', hex: '#343A40' },
    { name: 'Illuminating Emerald', hex: '#40916C' },
    { name: 'Apple Green', hex: '#80B918' },
    { name: 'Pale Cerulean', hex: '#98C1D9' },
  ],
  FIXED_EXPENSE_TAGS: [
    'Luz',
    'Água',
    'Internet',
    'Despesa do mês',
    'Aluguel',
    'Mobilidade',
    'Almoço',
    'Feira',
    'Netflix',
    'Spotify',
    'Doação à UIPA',
    'Ração',
    'PSN',
  ],
  DEFAULT_EXPENSE_CATEGORIES: [
    { description: 'Moradia', icon: 'FontAwesome:home', color: '#f4a261' },
    {
      description: 'Contas Residenciais',
      icon: 'Ionicons:documents',
      color: '#2a9d8f',
    },
    {
      description: 'Saúde',
      icon: 'MaterialCommunityIcons:heart-pulse',
      color: '#778745',
    },
    {
      description: 'Educação',
      icon: 'Octicons:mortar-board',
      color: '#457b9d',
    },
    {
      description: 'Transporte',
      icon: 'FontAwesome5:bus-alt',
      color: '#999999',
    },
    {
      description: 'Mercado',
      icon: 'MaterialIcons:local-grocery-store',
      color: '#1976d2',
    },
    {
      description: 'Cuidados Pessoais',
      icon: 'MaterialIcons:self-improvement',
      color: '#ef476f',
    },
    {
      description: 'Assinaturas & Serviços',
      icon: 'MaterialCommunityIcons:palette-swatch',
      color: '#161a1d',
    },
    {
      description: 'Lazer',
      icon: 'MaterialCommunityIcons:emoticon-happy',
      color: '#5a189a',
    },
    {
      description: 'Comida',
      icon: 'MaterialIcons:dinner-dining',
      color: '#e5383b',
    },
    {
      description: 'Presentes & Doações',
      icon: 'MaterialCommunityIcons:gift',
      color: '#ffc4d6',
    },
    { description: 'Família', icon: 'Ionicons:ios-people', color: '#083d77' },
    { description: 'Viagem', icon: 'Entypo:aircraft', color: '#ff8811' },
    {
      description: 'Outfit',
      icon: 'MaterialCommunityIcons:hanger',
      color: '#C5B400',
    },
    { description: 'Taxas', icon: 'MaterialIcons:payments', color: '#FF6233' },
    { description: 'Pets', icon: 'FontAwesome5:dog', color: '#6A381F' },
  ],
  FIXED_INCOME_TAGS: [
    'Salário',
    'Bico',
    'Mesada',
    'Inquilino',
    'Propriedade',
    'Loja Virtual',
  ],
  DEFAULT_INCOME_CATEGORIES: [
    {
      description: 'Investimento',
      icon: 'Entypo:area-graph',
      color: '#343a40',
    },
    {
      description: 'Benefício',
      icon: 'FontAwesome5:hands-helping',
      color: '#40916c',
    },
    {
      description: 'Salário',
      icon: 'MaterialIcons:attach-money',
      color: '#80b918',
    },
    {
      description: 'Empréstimo',
      icon: 'FontAwesome5:handshake',
      color: '#98c1d9',
    },
  ],
};
