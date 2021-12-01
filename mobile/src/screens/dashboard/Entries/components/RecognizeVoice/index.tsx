import React, { Component, useEffect } from 'react';
import {  
  BackHandler,
} from 'react-native';

import {StackActions} from '@react-navigation/native'
import { useTheme } from 'styled-components/native'; 
import {UseCategories, Categoria} from '../../../../../contexts/CategoriesContext'
import {UseContas, Conta} from '../../../../../contexts/AccountContext'
import {toDate} from '../../../../../helpers/manipularDatas'

import ButtonAdd from '../../../../../components/Button'

import {
    Action,
    Button,
    Container,
    Instructions,
    Stat,
    Welcome,
    Header,
    ButtonRecord,
    ContainerResults,
    ContainerItem,
    Bold
} from './styles'

import HeaderMain from '../../../components/Header';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

import {FormLancamentoStack} from '../../../../../@types/RootStackParamApp'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';
import { Lancamento, UseLancamentos } from '../../../../../contexts/EntriesContext';
import { Parcela, ReadParcela } from '../../../../../contexts/InstallmentContext';

import { StackNavigationProp } from '@react-navigation/stack';
import CardInstallment from '../../../Extract/components/CardInstallment'

import Header2 from '../../../../../components/Header';

type Props = {
    categorias: Categoria[],
    contas: Conta[]
    navigation: any
    handleAdicionarLancamento: (lancamentoProps: Lancamento, idUser: number) => Promise<string>
    showNiceToast: any
    theme: any
};

type State = {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: string;
  results: string[];
  partialResults: string[];
  isRecording: boolean;  
  itemNovo: Lancamento[];  
};

class VoiceTest extends Component<Props, State> {
    
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    isRecording: false, 
    categorias: [],
    itemNovo: [{}] as Lancamento[],
  };
  
  constructor(props: Props) {
    super(props);       

    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  }

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
      if(!e.value ) {
          console.log("onSpeechResults undefined")
          return
      }
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });

          
      
    
  };  

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if(!e.value ) {
        console.log("onSpeechPartialResults undefined")
        return
    }
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e: any) => {
   
  };

  _startRecognizing = async () => {
    

    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',      
      isRecording: true,
      itemNovo: !this.state.itemNovo ? [{}]  as Lancamento[] : this.state.itemNovo
    });

    try {
      await Voice.start('pt-BR');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {      
    try {
      await Voice.stop();
       this.setState({
         results: ["Eu comprei uma bazuca por r$ 4 no dia 5 de janeiro de 2022"]
       })
      
      this.setState({
        isRecording: false
      })
       this.generatePrincipal(this.tratoNoTexto(this.state.results[0]))      

    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      isRecording: false
    });
  };

  
  ConvertMonthIntoNumber(letters: string) {
    switch(letters) {
        case 'janeiro':
          return 1
        case 'feveiro':
          return 2
        case 'março':
          return 3
        case 'abril':
          return 4
        case 'maio':
          return 5
        case 'junho':
          return 6
        case 'julho':
          return 7
        case 'agosto':
          return 8
        case 'setembro':
          return 9
        case 'outubro':
          return 10
        case 'novembro':
          return 11
        case 'dezembro':
          return 12
        default:
          return 12
    }
  }

  primeiroComando(texto: string) {
    
    const acaoFluxoReceita = ['vendi', 'vendi um', 'vendi uma', 'recebi uma', 'recebi', 'recebi um', 'vendido', 'recebido']
    const acaoFluxoDespesa = ['comprei ', 'comprei um', , 'comprei uma', 'comprado', 'torrei']
    
    const actions = texto.split('vírgula');
        
    let captureLancamento: Lancamento[] = []

    for(var j = 0;j < actions.length;j++) {

      captureLancamento[j] = {
        id: -1,
        descricaoLancamento: '',
        tipoLancamento: '',
        parcelaBaseada: -1,
        lugarLancamento: 'extrato',      
        parcelasLancamento: [{
          id: -1,
          statusParcela: true
        }] as Parcela[],      
        essencial: false,
        categoryLancamento: {} as Categoria
      }
      // acaoFluxo
      let indexFim_acaoFluxo: any
      acaoFluxoReceita.map((item, index) => {
        if (actions[j].indexOf(item) != -1) {
          captureLancamento[j].tipoLancamento = 'receita'
  
          indexFim_acaoFluxo = actions[j].indexOf(item) + item.length
        }
      })
  
      if (captureLancamento[j].tipoLancamento == '')
        acaoFluxoDespesa.map((item, index) => {
            if(!item) return
  
          if (actions[j].indexOf(item) != -1) {
            captureLancamento[j].tipoLancamento = 'despesa'
  
            indexFim_acaoFluxo = actions[j].indexOf(item) + item.length
          }
        })
  
      if (captureLancamento[j].tipoLancamento == '')
        return 'nao foi:fluxo de se é receita ou despesa não encontrado'
  
      // item
      let i = indexFim_acaoFluxo
  
      
      for (; actions[j].substr(i, 3) != 'por' && i < actions[j].length; i++) {
  
        captureLancamento[j].descricaoLancamento += actions[j][i]
      }
  
      captureLancamento[j].descricaoLancamento = captureLancamento[j].descricaoLancamento.trim()
      
      if (captureLancamento[j].descricaoLancamento == '')
        return 'nao foi:O nome do lançamento não foi encontrado'
      if(i == actions[j].length)
        return 'nao foi:Não foi encontrado a relação do lançamento com o preço (Pode ter faltado a palavra \'por\')'
  
      // dinheiro
      let [moeda, valor] = actions[j].substr(i + 3).trim().split(' ')
  
      captureLancamento[j].parcelasLancamento[0].valorParcela = parseFloat(valor)
  
      i += valor.length + moeda.length + 2
  
      if (captureLancamento[j].parcelasLancamento[0].valorParcela == undefined)
      return 'nao foi:O valor ou a moeda não foram encontrados'
      //categoria
      
      // actions[j] a partir das categorias para frente
  
      const aux = actions[j].substr(i + 4)
  
      
  
      this.props.categorias.map(item => {
        if (aux.toLocaleLowerCase().indexOf(item.nomeCategoria.toLocaleLowerCase()) != -1) {
          console.log(captureLancamento[j].categoryLancamento, item)
          captureLancamento[j].categoryLancamento = item
        }
      })
      
      if(!captureLancamento[j].categoryLancamento.id) {
        captureLancamento[j].categoryLancamento = j != 0 ? captureLancamento[j-1].categoryLancamento : this.props.categorias[0]
      }

      //conta
      this.props.contas.map(item => {
          if (aux.toLocaleLowerCase().indexOf(item.descricao.toLocaleLowerCase()) != -1) {
            captureLancamento[j].parcelasLancamento[0].contaParcela = item
          }
        })

      if(!captureLancamento[j].parcelasLancamento[0].contaParcela) {
        captureLancamento[j].parcelasLancamento[0].contaParcela = j != 0 ? captureLancamento[j-1].parcelasLancamento[0].contaParcela : this.props.contas[0]
      }
  
      const cacarDatas = aux.split(' ')        
  
      // console.log(cacarDatas)
      for(var index = 0;index < cacarDatas.length-4;index++) {        
          
  
        // console.debug("dia", parseInt(cacarDatas[index]))
        // console.debug("de", cacarDatas[index+1])
        // console.debug("mes", cacarDatas[index+2])
        // console.debug("de", cacarDatas[index+3])
        // console.debug("ano", cacarDatas[index+4])
        // console.log()

          if(!isNaN(parseInt(cacarDatas[index])) &&
             cacarDatas[index+1] == 'de' &&
             !isNaN(this.ConvertMonthIntoNumber(cacarDatas[index+2])) &&
             cacarDatas[index+3] == 'de' &&
             !isNaN(parseInt(cacarDatas[index+4]))
             ) {
              const dataLocalAux = cacarDatas[index] + '/' + this.ConvertMonthIntoNumber(cacarDatas[index+2]) + '/' + cacarDatas[index+4]
              
              captureLancamento[j].parcelasLancamento[0].dataParcela = toDate(dataLocalAux)
             }
      }
      
      if(!captureLancamento[j].parcelasLancamento[0].dataParcela)
        captureLancamento[j].parcelasLancamento[0].dataParcela = new Date(Date.now())
      
        console.log("O lancamento", captureLancamento[j])
      this.setState({
        itemNovo: [...this.state.itemNovo,captureLancamento[j]]
      })      
    }

    return ''    
  }

  generatePrincipal(texto: string) {
    let text: string
    
    if ((text = this.primeiroComando(texto)) && text.indexOf('nao foi')) {
      console.log('caiu no primeiroComando')
      const comandosJson = JSON.parse(text)    

      this.setState({itemNovo: comandosJson})      
      // this.props.navigation.dispatch(StackActions.replace('Lancamentos', {screen: 'Main', params: {receiveVoice: itensNovo}}))
    } else {
      // alert('Nenhum foi encontrado')
      console.log('deu em nada',text)
    }
  }
  
  ItemHandled = (item: Lancamento | null) => {        

    if(!item?.id) return    
    
    const readParcela: ReadParcela = {
      id: -1,
      contaParcela: !item.parcelasLancamento[0].contaParcela ? {} as Conta : item.parcelasLancamento[0].contaParcela,
      dataParcela: item.parcelasLancamento[0].dataParcela.toLocaleDateString(),
      lancamentoParcela: item,
      valorParcela: item.parcelasLancamento[0].valorParcela,
      totalParcelas: 1,
      indexOfLancamento: 1,      
      statusParcela: item.parcelasLancamento[0].statusParcela
    }
        
    return (      
        <CardInstallment item={readParcela}/>      
    )
  }

  tratoNoTexto(texto: string) {
    let aux = texto.split(' ')

    let auxDoAux = aux
    aux.map((item, index) => {
      if (item == ',') {
        auxDoAux[index] = 'vírgula'
      } else if (index < aux.length - 2 && item >= '0' &&
        item <= '9' &&
        (aux[index + 1] == 'e' || aux[index + 1] == 'vírgula') &&
        aux[index + 2] == 'r$'
      ) {
        auxDoAux[index] = 'r$'
        auxDoAux[index + 1] = item + '.' + aux[index + 3]
        auxDoAux[index + 2] = ''
        auxDoAux[index + 3] = ''
      } else {

      }
    })

    let auxDoAuxDoAux = ''

    auxDoAux.map(item => {
      if (item != '') auxDoAuxDoAux += item + ' '
    })

    console.log('auxDoAuxDoAux: ' + auxDoAuxDoAux.trim())

    return auxDoAuxDoAux.trim()
  } 

  async handleItemCapture(itemNovos: Lancamento[]) {   
    if(!itemNovos[0].id && itemNovos.length == 1) {      
      return this.props.showNiceToast("error","Nenhum item adicionado")
    }          
    
    let foi = false
    itemNovos.map(async (item, index) => {
      if(index == 0)
        return
      if(index == 1) foi = true

      const readItemNovo = {
        ...item
      }
  
      readItemNovo.categoryLancamento = readItemNovo.categoryLancamento.nomeCategoria
          
      const response = await this.props.handleAdicionarLancamento(readItemNovo, await retornarIdDoUsuario())
    
      console.log("resultado", response == "" ? "cadastrou" : response)
      if(response == '') {
        
      } else {
        foi = false        
      }
    })

    if(foi) {      
      this.props.showNiceToast("success",`${itemNovos.length == 1 ? 'O cadastro foi realizado' : 'Os cadastros foram realizados'}`)
      this.setState({
        itemNovo: [{}] as Lancamento[]
      })
    }
  }

  render() {  

    return (
      <Container>

       <Header>
         <Header2 
            backButton={this.props.navigation.dispatch(StackActions.replace(
              'StackAccount', { screen: 'Main'}
            ))}
            title=""
            />
          <ButtonRecord 
          style={{backgroundColor: this.state.isRecording ? this.props.theme.colors.white : this.props.theme.colors.paradisePink , borderRadius: 50}}
          onPress={this.state.isRecording ? this._stopRecognizing : this._startRecognizing}>
            <Icon 
              style={{width: 100, height: 100}} 
              name="keyboard-voice"
              color={this.state.isRecording ? this.props.theme.colors.paradisePink : this.props.theme.colors.white}
              size={100}
            />
          </ButtonRecord>          
       </Header>

        <Instructions style={{textAlign: 'justify'}}>
          Clique no botão acima e insira por 
          <Bold> comandos de voz </Bold>
          {"\n\n"}
          <Bold>Ex: </Bold>
          “Eu comprei arroz por 15 reais da categoria mercado no dia 10 do 10 de 2021”
        </Instructions>
        
        <ContainerResults>
          <Stat>            
          {this.state.results[0]}
          </Stat>
        </ContainerResults>

        <ContainerItem>
          {
            this.state.itemNovo[0].id == 0 ? 
            {} : 
            this.state.itemNovo.map((item, index) => {                        
              return this.ItemHandled(item)                 
            })
          }
        </ContainerItem>

        <ButtonAdd
          title="Adicionar"
          onPress={() => this.handleItemCapture(this.state.itemNovo)}
          style={{backgroundColor: this.props.theme.colors.paradisePink}}
          color={this.props.theme.colors.white}
        />

      </Container>
    );
  }
}

export default () => {
    const {categorias, handleReadByUserCategorias} = UseCategories()
    const {contas, handleReadByUserContas} = UseContas()
    const {handleAdicionarLancamento} = UseLancamentos()    
    const theme: any = useTheme()

    const {navigation, showNiceToast} = UseDadosTemp()

    useEffect(() => {
        (async function () {
            if(!categorias) {
                handleReadByUserCategorias(await retornarIdDoUsuario(), 'todos')
            }
            if(!contas) {
                handleReadByUserContas(await retornarIdDoUsuario())
            }
        }())
      
    }, [])

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    const backAction = () => {
      navigation.dispatch(StackActions.replace('Main', {screen: 'Home'}));
      return true;
    };


    return (
        <VoiceTest showNiceToast={showNiceToast} theme={theme} navigation={navigation} handleAdicionarLancamento={handleAdicionarLancamento} categorias={categorias ? categorias : []} contas={contas ? contas : []}/>
    )
};