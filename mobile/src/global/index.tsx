import React from 'react';
import { Text, View } from 'react-native';
import NiceToast from '../components/NiceToast';
import { ToastProps } from '@zellosoft.com/react-native-toast-message';
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
    niceToast: ({ props }: any) => (
      <NiceToast
        type={props.type}
        title={props.title}
        message={props.message}
        detailed={props.detailed}
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
  DEFAULT_ICONS_CATEGORYACCOUNT: [
    {
      description: 'ABC Brasil',
      accent: '#ececec',
    },

    {
      description: 'Acesso Banco',
      accent: '#00bf66',
    },

    {
      description: 'ActivTrades',
      accent: '#040c1b',
    },

    {
      description: 'Agibank',
      accent: '#ececec',
    },

    {
      description: 'Ágora Investimentos',
      accent: '#002529',
    },

    {
      description: 'alelo',
      accent: '#7f9525',
    },

    {
      description: 'Ame Digital',
      accent: '#ececec',
    },

    {
      description: 'Avenue Securitie',
      accent: '#1d1d1d',
    },

    {
      description: 'B2S',
      accent: '#231d98',
    },

    {
      description: 'Banco Cacique',
      accent: '#ececec',
    },

    {
      description: 'Banco da Amazônia',
      accent: '#052a15',
    },

    {
      description: 'Banco do Brasil',
      accent: '#afaf33',
    },

    {
      description: 'Banco do Nordeste',
      accent: '#5d0f22',
    },

    {
      description: 'Banco Inter',
      accent: '#d7d7d7',
    },

    {
      description: 'Banco Original',
      accent: '#ececec',
    },

    {
      description: 'Banco PAN',
      accent: '#0c8ec9',
    },

    {
      description: 'Banco Sofisa direto',
      accent: '#ececec',
    },

    {
      description: 'Banco Votorantim',
      accent: '#034c2e',
    },

    {
      description: 'Banestes',
      accent: '#003365',
    },

    {
      description: 'Banif',
      accent: '#660075',
    },

    {
      description: 'Banpara',
      accent: '#ececec',
    },

    {
      description: 'Banrisul',
      accent: '#005889',
    },

    {
      description: 'bbm',
      accent: '#ececec',
    },

    {
      description: 'BBVA',
      accent: '#003365',
    },

    {
      description: 'Ben Visa Vale',
      accent: '#ececec',
    },

    {
      description: 'Binance',
      accent: '#232323',
    },

    {
      description: 'BGM',
      accent: '#cd7318',
    },

    {
      description: 'Bradesco',
      accent: '#ececec',
    },

    {
      description: 'BRB',
      accent: '#ececec',
    },

    {
      description: 'BRDE',
      accent: '#ececec',
    },

    {
      description: 'BTG Pactual',
      accent: '#000c32',
    },

    {
      description: 'BTG+',
      accent: '#232323',
    },

    {
      description: 'C6 Bank',
      accent: '#141414',
    },

    {
      description: 'Caixa',
      accent: '#ececec',
    },

    {
      description: 'Carrefour',
      accent: '#ececec',
    },

    {
      description: 'Celcoin',
      accent: '#ececec',
    },

    {
      description: 'Cetelem',
      accent: '#ececec',
    },

    {
      description: 'Citibank',
      accent: '#003365',
    },

    {
      description: 'Clear Investimentos',
      accent: '#ececec',
    },

    {
      description: 'Cruzeirodosul',
      accent: '#ececec',
    },

    {
      description: 'Daycoval',
      accent: '#ececec',
    },

    {
      description: 'Desjardins Bank',
      accent: '#ececec',
    },

    {
      description: 'Digi+',
      accent: '#000624',
    },

    {
      description: 'Digio',
      accent: '#000b3d',
    },

    {
      description: 'Diin',
      accent: '#ececec',
    },

    {
      description: 'Easynvest',
      accent: '#d9d9b8',
    },

    {
      description: 'EbanxGo',
      accent: '#171b21',
    },

    {
      description: 'Elliot',
      accent: '#ececec',
    },

    {
      description: 'Genial Investimentos',
      accent: '#ececec',
    },

    {
      description: 'Havan',
      accent: '#002959',
    },

    {
      description: 'Hotmart',
      accent: '#ececec',
    },

    {
      description: 'HSBC',
      accent: '#ececec',
    },

    {
      description: 'Icatu',
      accent: '#002959',
    },

    {
      description: 'IQ Option',
      accent: '#003365',
    },

    {
      description: 'Itaú Personnalite',
      accent: '#050914',
    },

    {
      description: 'Itaú',
      accent: '#ececec',
    },

    {
      description: 'Iti',
      accent: '#bb0671',
    },

    {
      description: 'Juno',
      accent: '#0d14a8',
    },

    {
      description: 'LHV',
      accent: '#ececec',
    },

    {
      description: 'Magnetis',
      accent: '#ececec',
    },

    {
      description: 'Méliuz',
      accent: '#cb1e3a',
    },

    {
      description: 'Mercado Bitcoin',
      accent: '#ececec',
    },

    {
      description: 'MercadoPago',
      accent: '#ececec',
    },

    {
      description: 'Mercantil do Brasil',
      accent: '#ececec',
    },

    {
      description: 'ModalMais',
      accent: '#191a21',
    },

    {
      description: 'Moip',
      accent: '#ececec',
    },

    {
      description: 'Monetizze',
      accent: '#00345a',
    },

    {
      description: 'Monetus',
      accent: '#ececec',
    },

    {
      description: 'N26',
      accent: '#ececec',
    },

    {
      description: 'Neon',
      accent: '#07aac3',
    },

    {
      description: 'Next',
      accent: '#01bb46',
    },

    {
      description: 'Nova Futura Investimentos',
      accent: '#ececec',
    },
    {
      description: 'NovaDAX',
      accent: '#cac7bf',
    },

    {
      description: 'NuBank',
      accent: '#6306a0',
    },

    {
      description: 'Órama',
      accent: '#01571d',
    },

    {
      description: 'Pag!',
      accent: '#ececec',
    },

    {
      description: 'PagBank',
      accent: '#01571d',
    },

    {
      description: 'PagSeguro',
      accent: '#009a7e',
    },

    {
      description: 'Paypal',
      accent: '#00488d',
    },

    {
      description: 'PayU Brasil',
      accent: '#a0ae00',
    },

    {
      description: 'PicPay',
      accent: '#489e39',
    },

    {
      description: 'Porto Seguro',
      accent: '#ececec',
    },
    {
      description: 'Primacredi',
      accent: '#ececec',
    },

    {
      description: 'RCI',
      accent: '#ececec',
    },

    {
      description: 'Recargapay',
      accent: '#ececec',
    },

    {
      description: 'Rico',
      accent: '#cf4502',
    },

    {
      description: 'Safra',
      accent: '#ececec',
    },

    {
      description: 'Santander',
      accent: '#ececec',
    },

    {
      description: 'Shoptime',
      accent: '#ececec',
    },

    {
      description: 'Sicoob',
      accent: '#ececec',
    },

    {
      description: 'Sicredi',
      accent: '#ececec',
    },

    {
      description: 'Social Bank',
      accent: '#ececec',
    },

    {
      description: 'Sodexo',
      accent: '#ececec',
    },

    {
      description: 'Sumup',
      accent: '#ececec',
    },

    {
      description: 'Tangerine',
      accent: '#ca610d',
    },

    {
      description: 'TD AmeriTrade',
      accent: '#ececec',
    },
    {
      description: 'Tesouro Direto',
      accent: '#ececec',
    },

    {
      description: 'Tesouro Nacional',
      accent: '#ececec',
    },

    {
      description: 'Ticket',
      accent: '#ececec',
    },

    {
      description: 'Toro Investimentos',
      accent: '#ececec',
    },

    {
      description: 'Tribanco',
      accent: '#ececec',
    },

    {
      description: 'Tudo Azul',
      accent: '#000d24',
    },

    {
      description: 'Unicred',
      accent: '#012a1a',
    },

    {
      description: 'Uniprime',
      accent: '#003850',
    },

    {
      description: 'Urbe.Me',
      accent: '#000d24',
    },

    {
      description: 'UrPay',
      accent: '#ececec',
    },

    {
      description: 'Viacredi',
      accent: '#004661',
    },

    {
      description: 'Vitreo',
      accent: '#ececec',
    },

    {
      description: 'Warren',
      accent: '#ececec',
    },

    {
      description: 'Wirecard',
      accent: '#ececec',
    },

    {
      description: 'Woop',
      accent: '#ececec',
    },

    {
      description: 'Xdex',
      accent: '#ececec',
    },

    {
      description: 'Xp Investimentos',
      accent: '#02131d',
    },

    {
      description: 'Caixa',
      icon: 'https://logodownload.org/wp-content/uploads/2014/02/caixa-logo.jpg',
    },
    {
      description: 'Banco do Brasil',
      icon: 'https://play-lh.googleusercontent.com/1-aNhsSPNqiVluwNGZar_7F5PbQ4u1zteuJ1jumnArhe8bfYHHaVwu4aVOF5-NAmLaA',
    },
    {
      description: 'Itaú',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banco_Ita%C3%BA_logo.svg/1200px-Banco_Ita%C3%BA_logo.svg.png',
    },
    {
      description: 'Moeda em círculo',
      icon: 'MaterialCommunityIcons:currency-usd-circle',
    },
    {
      description: 'Banco da Amazônia',
      icon: 'https://projeto-cdn.infra.grancursosonline.com.br/basa.png',
    },
    { description: 'Nubank', icon: 'https://t2.tudocdn.net/354716?w=1200' },
    {
      description: 'Bradesco',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1QN1uIngc6pkX2Zg5Mn_mvZ501sC6x0luIz9TQ1W1jUi8zTSCiwSOMmJKs-uNiu6uXw&usqp=CAU',
    },
    {
      description: 'Carteira',
      icon: 'Entypo:wallet',
    },
    {
      description: 'Banco Safra',
      icon: 'https://seeklogo.com/images/B/Banco_Safra-logo-517D130E32-seeklogo.com.png',
    },
    {
      description: 'Gráfico',
      icon: 'MaterialIcons:show-chart',
    },
    {
      description: 'Banco Inter',
      icon: 'https://play-lh.googleusercontent.com/FDCnEZ5wKIYucB6n63jQC8tymfmoaNtM2GScjDP5fuKzG4bjXqWshysyfDvxccVYwg',
    },
  ],
};
