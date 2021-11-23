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
      icon: require('../assets/images/banks/ABC Brasil.png'),
    },

    {
      description: 'Acesso Bank',
      accent: '#00bf66',
      icon: require('../assets/images/banks/Acesso Bank.png'),
    },

    {
      description: 'ActivTrades',
      accent: '#040c1b',
      icon: require('../assets/images/banks/ActivTrades.png'),
    },

    {
      description: 'Agibank',
      accent: '#ececec',
      icon: require('../assets/images/banks/Agibank.png'),
    },

    {
      description: 'Ágora Investimentos',
      accent: '#002529',
      icon: require('../assets/images/banks/Ágora Investimentos.png'),
    },

    {
      description: 'alelo',
      accent: '#7f9525',
      icon: require('../assets/images/banks/alelo.png'),
    },

    {
      description: 'Ame Digital',
      accent: '#ececec',
      icon: require('../assets/images/banks/Ame Digital.png'),
    },

    {
      description: 'Avenue Securitie',
      accent: '#1d1d1d',
      icon: require('../assets/images/banks/Avenue Securitie.png'),
    },

    {
      description: 'B2S',
      accent: '#231d98',
      icon: require('../assets/images/banks/B2S.png'),
    },

    {
      description: 'Banco Cacique',
      accent: '#ececec',
      icon: require('../assets/images/banks/Banco Cacique.png'),
    },

    {
      description: 'Banco da Amazônia',
      accent: '#052a15',
      icon: require('../assets/images/banks/Banco da Amazônia.png'),
    },

    {
      description: 'Banco do Brasil',
      accent: '#afaf33',
      icon: require('../assets/images/banks/Banco do Brasil.png'),
    },

    {
      description: 'Banco do Nordeste',
      accent: '#5d0f22',
      icon: require('../assets/images/banks/Banco do Nordeste.png'),
    },

    {
      description: 'Banco Inter',
      accent: '#d7d7d7',
      icon: require('../assets/images/banks/Banco Inter.png'),
    },

    {
      description: 'Banco Original',
      accent: '#ececec',
      icon: require('../assets/images/banks/Banco Original.png'),
    },

    {
      description: 'Banco PAN',
      accent: '#0c8ec9',
      icon: require('../assets/images/banks/Banco PAN.png'),
    },

    {
      description: 'Banco Sofisa direto',
      accent: '#ececec',
      icon: require('../assets/images/banks/Banco Sofisa direto.png'),
    },

    {
      description: 'Banco Votorantim',
      accent: '#034c2e',
      icon: require('../assets/images/banks/Banco Votorantim.png'),
    },

    {
      description: 'Banestes',
      accent: '#003365',
      icon: require('../assets/images/banks/Banestes.png'),
    },

    {
      description: 'Banif',
      accent: '#660075',
      icon: require('../assets/images/banks/Banif.png'),
    },

    {
      description: 'Banpara',
      accent: '#ececec',
      icon: require('../assets/images/banks/Banpara.png'),
    },

    {
      description: 'Banrisul',
      accent: '#005889',
      icon: require('../assets/images/banks/Banrisul.png'),
    },

    {
      description: 'Bbm',
      accent: '#ececec',
      icon: require('../assets/images/banks/Bbm.png'),
    },

    {
      description: 'BBVA',
      accent: '#003365',
      icon: require('../assets/images/banks/BBVA.png'),
    },

    {
      description: 'Ben Visa Vale',
      accent: '#ececec',
      icon: require('../assets/images/banks/Ben Visa Vale.png'),
    },

    {
      description: 'Binance',
      accent: '#232323',
      icon: require('../assets/images/banks/Binance.png'),
    },

    {
      description: 'BMG',
      accent: '#cd7318',
      icon: require('../assets/images/banks/BMG.png'),
    },

    {
      description: 'Bradesco',
      accent: '#ececec',
      icon: require('../assets/images/banks/Bradesco.png'),
    },

    {
      description: 'BRB',
      accent: '#ececec',
      icon: require('../assets/images/banks/BRB.png'),
    },

    {
      description: 'BRDE',
      accent: '#ececec',
      icon: require('../assets/images/banks/BRDE.png'),
    },

    {
      description: 'BTG Pactual',
      accent: '#000c32',
      icon: require('../assets/images/banks/BTG Pactual.png'),
    },

    {
      description: 'BTG+',
      accent: '#232323',
      icon: require('../assets/images/banks/BTG+.png'),
    },

    {
      description: 'C6 Bank',
      accent: '#141414',
      icon: require('../assets/images/banks/C6 Bank.png'),
    },

    {
      description: 'Caixa',
      accent: '#ececec',
      icon: require('../assets/images/banks/Caixa.png'),
    },

    {
      description: 'Carrefour',
      accent: '#ececec',
      icon: require('../assets/images/banks/Carrefour.png'),
    },

    {
      description: 'Celcoin',
      accent: '#ececec',
      icon: require('../assets/images/banks/Celcoin.png'),
    },

    {
      description: 'Cetelem',
      accent: '#ececec',
      icon: require('../assets/images/banks/Cetelem.png'),
    },

    {
      description: 'Citibank',
      accent: '#003365',
      icon: require('../assets/images/banks/Citibank.png'),
    },

    {
      description: 'Clear Investimentos',
      accent: '#ececec',
      icon: require('../assets/images/banks/Clear Investimentos.png'),
    },

    {
      description: 'Cruzeiro do Sul',
      accent: '#ececec',
      icon: require('../assets/images/banks/Cruzeiro do Sul.png'),
    },

    {
      description: 'Daycoval',
      accent: '#ececec',
      icon: require('../assets/images/banks/Daycoval.png'),
    },

    {
      description: 'Desjardins Bank',
      accent: '#ececec',
      icon: require('../assets/images/banks/Desjardins Bank.png'),
    },

    {
      description: 'Digi+',
      accent: '#000624',
      icon: require('../assets/images/banks/Digi+.png'),
    },

    {
      description: 'Digio',
      accent: '#000b3d',
      icon: require('../assets/images/banks/Digio.png'),
    },

    {
      description: 'Diin',
      accent: '#ececec',
      icon: require('../assets/images/banks/Diin.png'),
    },

    {
      description: 'Easynvest',
      accent: '#d9d9b8',
      icon: require('../assets/images/banks/Easynvest.png'),
    },

    {
      description: 'EbanxGo',
      accent: '#171b21',
      icon: require('../assets/images/banks/EbanxGo.png'),
    },

    {
      description: 'Elliot',
      accent: '#ececec',
      icon: require('../assets/images/banks/Elliot.png'),
    },

    {
      description: 'Genial Investimentos',
      accent: '#ececec',
      icon: require('../assets/images/banks/Genial Investimentos.png'),
    },

    {
      description: 'Havan',
      accent: '#002959',
      icon: require('../assets/images/banks/Havan.png'),
    },

    {
      description: 'Hotmart',
      accent: '#ececec',
      icon: require('../assets/images/banks/Hotmart.png'),
    },

    {
      description: 'HSBC',
      accent: '#ececec',
      icon: require('../assets/images/banks/HSBC.png'),
    },

    {
      description: 'Icatu',
      accent: '#002959',
      icon: require('../assets/images/banks/Icatu.png'),
    },

    {
      description: 'IQ Option',
      accent: '#003365',
      icon: require('../assets/images/banks/IQ Option.png'),
    },

    {
      description: 'Itaú Personnalite',
      accent: '#050914',
      icon: require('../assets/images/banks/Itaú Personnalite.png'),
    },

    {
      description: 'Itaú',
      accent: '#ececec',
      icon: require('../assets/images/banks/Itaú.png'),
    },

    {
      description: 'Iti',
      accent: '#bb0671',
      icon: require('../assets/images/banks/Iti.png'),
    },

    {
      description: 'Juno',
      accent: '#0d14a8',
      icon: require('../assets/images/banks/Juno.png'),
    },

    {
      description: 'LHV',
      accent: '#ececec',
      icon: require('../assets/images/banks/LHV.png'),
    },

    {
      description: 'Magnetis',
      accent: '#ececec',
      icon: require('../assets/images/banks/Magnetis.png'),
    },

    {
      description: 'Méliuz',
      accent: '#cb1e3a',
      icon: require('../assets/images/banks/Méliuz.png'),
    },

    {
      description: 'Mercado Bitcoin',
      accent: '#ececec',
      icon: require('../assets/images/banks/Mercado Bitcoin.png'),
    },

    {
      description: 'MercadoPago',
      accent: '#ececec',
      icon: require('../assets/images/banks/MercadoPago.png'),
    },

    {
      description: 'Mercantil do Brasil',
      accent: '#ececec',
      icon: require('../assets/images/banks/Mercantil do Brasil.png'),
    },

    {
      description: 'ModalMais',
      accent: '#191a21',
      icon: require('../assets/images/banks/ModalMais.png'),
    },

    {
      description: 'Moip',
      accent: '#ececec',
      icon: require('../assets/images/banks/Moip.png'),
    },

    {
      description: 'Monetizze',
      accent: '#00345a',
      icon: require('../assets/images/banks/Monetizze.png'),
    },

    {
      description: 'Monetus',
      accent: '#ececec',
      icon: require('../assets/images/banks/Monetus.png'),
    },

    {
      description: 'N26',
      accent: '#ececec',
      icon: require('../assets/images/banks/N26.png'),
    },

    {
      description: 'Neon',
      accent: '#07aac3',
      icon: require('../assets/images/banks/Neon.png'),
    },

    {
      description: 'Next',
      accent: '#01bb46',
      icon: require('../assets/images/banks/Next.png'),
    },

    {
      description: 'Nova Futura Investimentos',
      accent: '#ececec',
      icon: require('../assets/images/banks/Nova Futura Investimentos.png'),
    },
    {
      description: 'NovaDAX',
      accent: '#cac7bf',
      icon: require('../assets/images/banks/NovaDAX.png'),
    },

    {
      description: 'NuBank',
      accent: '#6306a0',
      icon: require('../assets/images/banks/NuBank.png'),
    },

    {
      description: 'Órama',
      accent: '#01571d',
      icon: require('../assets/images/banks/Órama.png'),
    },

    {
      description: 'Pag!',
      accent: '#ececec',
      icon: require('../assets/images/banks/Pag!.png'),
    },

    {
      description: 'PagBank',
      accent: '#01571d',
      icon: require('../assets/images/banks/PagBank.png'),
    },

    {
      description: 'PagSeguro',
      accent: '#009a7e',
      icon: require('../assets/images/banks/PagSeguro.png'),
    },

    {
      description: 'Paypal',
      accent: '#00488d',
      icon: require('../assets/images/banks/Paypal.png'),
    },

    {
      description: 'PayU Brasil',
      accent: '#a0ae00',
      icon: require('../assets/images/banks/PayU Brasil.png'),
    },

    {
      description: 'PicPay',
      accent: '#489e39',
      icon: require('../assets/images/banks/PicPay.png'),
    },

    {
      description: 'Porto Seguro',
      accent: '#ececec',
      icon: require('../assets/images/banks/Porto Seguro.png'),
    },
    {
      description: 'Primacredi',
      accent: '#ececec',
      icon: require('../assets/images/banks/Primacredi.png'),
    },

    {
      description: 'RCI',
      accent: '#ececec',
      icon: require('../assets/images/banks/RCI.png'),
    },

    {
      description: 'Recargapay',
      accent: '#ececec',
      icon: require('../assets/images/banks/Recargapay.png'),
    },

    {
      description: 'Rico',
      accent: '#cf4502',
      icon: require('../assets/images/banks/Rico.png'),
    },

    {
      description: 'Safra',
      accent: '#ececec',
      icon: require('../assets/images/banks/Safra.png'),
    },

    {
      description: 'Santander',
      accent: '#ececec',
      icon: require('../assets/images/banks/Santander.png'),
    },

    {
      description: 'Shoptime',
      accent: '#ececec',
      icon: require('../assets/images/banks/Shoptime.png'),
    },

    {
      description: 'Sicoob',
      accent: '#ececec',
      icon: require('../assets/images/banks/Sicoob.png'),
    },

    {
      description: 'Sicredi',
      accent: '#ececec',
      icon: require('../assets/images/banks/Sicredi.png'),
    },

    {
      description: 'Social Bank',
      accent: '#ececec',
      icon: require('../assets/images/banks/Social Bank.png'),
    },

    {
      description: 'Sodexo',
      accent: '#ececec',
      icon: require('../assets/images/banks/Sodexo.png'),
    },

    {
      description: 'Sumup',
      accent: '#ececec',
      icon: require('../assets/images/banks/Sumup.png'),
    },

    {
      description: 'Tangerine',
      accent: '#ca610d',
      icon: require('../assets/images/banks/Tangerine.png'),
    },

    {
      description: 'TD AmeriTrade',
      accent: '#ececec',
      icon: require('../assets/images/banks/TD AmeriTrade.png'),
    },
    {
      description: 'Tesouro Direto',
      accent: '#ececec',
      icon: require('../assets/images/banks/Tesouro Direto.png'),
    },

    {
      description: 'Tesouro Nacional',
      accent: '#ececec',
      icon: require('../assets/images/banks/Tesouro Nacional.png'),
    },

    {
      description: 'Ticket',
      accent: '#ececec',
      icon: require('../assets/images/banks/Ticket.png'),
    },

    {
      description: 'Toro Investimentos',
      accent: '#ececec',
      icon: require('../assets/images/banks/Toro Investimentos.png'),
    },

    {
      description: 'Tribanco',
      accent: '#ececec',
      icon: require('../assets/images/banks/Tribanco.png'),
    },

    {
      description: 'Tudo Azul',
      accent: '#000d24',
      icon: require('../assets/images/banks/Tudo Azul.png'),
    },

    {
      description: 'Unicred',
      accent: '#012a1a',
      icon: require('../assets/images/banks/Unicred.png'),
    },

    {
      description: 'Uniprime',
      accent: '#003850',
      icon: require('../assets/images/banks/Uniprime.png'),
    },

    {
      description: 'Urbe.Me',
      accent: '#000d24',
      icon: require('../assets/images/banks/Urbe.Me.png'),
    },

    {
      description: 'UrPay',
      accent: '#ececec',
      icon: require('../assets/images/banks/UrPay.png'),
    },

    {
      description: 'Viacredi',
      accent: '#004661',
      icon: require('../assets/images/banks/Viacredi.png'),
    },

    {
      description: 'Vitreo',
      accent: '#ececec',
      icon: require('../assets/images/banks/Vitreo.png'),
    },

    {
      description: 'Warren',
      accent: '#ececec',
      icon: require('../assets/images/banks/Warren.png'),
    },

    {
      description: 'Wirecard',
      accent: '#ececec',
      icon: require('../assets/images/banks/Wirecard.png'),
    },

    {
      description: 'Woop',
      accent: '#ececec',
      icon: require('../assets/images/banks/Woop.png'),
    },

    {
      description: 'Xdex',
      accent: '#ececec',
      icon: require('../assets/images/banks/Xdex.png'),
    },

    {
      description: 'Xp Investimentos',
      accent: '#02131d',
      icon: require('../assets/images/banks/Xp Investimentos.png'),
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
