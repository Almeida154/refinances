import React, { Component, useEffect } from 'react';
import {  
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';

import {StackActions} from '@react-navigation/native'

import {UseCategories, Categoria} from '../../../../../contexts/CategoriesContext'
import {UseContas, Conta} from '../../../../../contexts/AccountContext'
import {toDate} from '../../../../../helpers/manipularDatas'

import {
    Action,
    Button,
    Container,
    Instructions,
    Stat,
    Welcome,
    Header,
    ButtonRecord,
    ContainerResults
} from './styles'

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

import {FormLancamentoStack} from '../../../../../@types/RootStackParamApp'

import {ReceiveVoice} from '../../'

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
import { FAB } from 'react-native-paper';


type Props = {
    categorias: Categoria[],
    contas: Conta[]
    navigation: any
    handleAdicionarLancamento: (lancamentoProps: Lancamento, idUser: number) => Promise<string>
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
  itemNovo: any | null;  
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
    itemNovo: null,
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
      itemNovo: null
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
       this.generatePrincipal(this.tratoNoTexto("Eu comprei uma picareta por r$ 20 da categoria cuidados pessoais da conta principal no dia 30 do 10 de 2021"))      
       this.setState({
         isRecording: false
       })

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


  primeiroComando(texto: string) {
    const captureLancamento = {
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
    } as Lancamento    
    
    const acaoFluxoReceita = ['vendi', 'vendi um', 'vendi uma', 'recebi uma', 'recebi', 'vendido', 'recebido']
    const acaoFluxoDespesa = ['comprei ', 'comprei um', , 'comprei uma', 'comprado', 'torrei']

    const categorias = ['alimentação', 'entretenimento', 'trabalho', 'varejo', 'ferramenta']   

    // acaoFluxo
    let indexFim_acaoFluxo: any
    acaoFluxoReceita.map((item, index) => {
      if (texto.indexOf(item) != -1) {
        captureLancamento.tipoLancamento = 'receita'

        indexFim_acaoFluxo = texto.indexOf(item) + item.length
      }
    })

    if (captureLancamento.tipoLancamento == '')
      acaoFluxoDespesa.map((item, index) => {
          if(!item) return

        if (texto.indexOf(item) != -1) {
          captureLancamento.tipoLancamento = 'despesa'

          indexFim_acaoFluxo = texto.indexOf(item) + item.length
        }
      })

    if (captureLancamento.tipoLancamento == '')
      return 'nao foi:fluxo de se é receita ou despesa não encontrado'

    // item
    let i = indexFim_acaoFluxo

    
    for (; texto.substr(i, 3) != 'por' && i < texto.length; i++) {

      captureLancamento.descricaoLancamento += texto[i]
    }

    captureLancamento.descricaoLancamento = captureLancamento.descricaoLancamento.trim()
    
    if (captureLancamento.descricaoLancamento == '')
      return 'nao foi:O nome do lançamento não foi encontrado'
    if(i == texto.length)
      return 'nao foi:Não foi encontrado a relação do lançamento com o preço (Pode ter faltado a palavra \'por\')'

    // dinheiro
    let [moeda, valor] = texto.substr(i + 3).trim().split(' ')

    captureLancamento.parcelasLancamento[0].valorParcela = parseFloat(valor)

    i += valor.length + moeda.length + 2

    if (captureLancamento.parcelasLancamento[0].valorParcela == undefined)
    return 'nao foi:O valor ou a moeda não foram encontrados'
    //categoria
    
    // Texto a partir das categorias para frente

    const aux = texto.substr(i + 4)

    

    this.props.categorias.map(item => {
      if (aux.indexOf(item.nomeCategoria.toLocaleLowerCase()) != -1) {
        captureLancamento.categoryLancamento = item
      }
    })
    
    //conta
    this.props.contas.map(item => {
        if (aux.indexOf(item.descricao.toLocaleLowerCase()) != -1) {
          captureLancamento.parcelasLancamento[0].contaParcela = item
        }
      })

    const cacarDatas = aux.split(' ')

    

    for(var index = 0;index < cacarDatas.length-4;index++) {        
        

        if(!isNaN(parseInt(cacarDatas[index])) &&
           cacarDatas[index+1] == 'do' &&
           !isNaN(parseInt(cacarDatas[index+2])) &&
           cacarDatas[index+3] == 'de' &&
           !isNaN(parseInt(cacarDatas[index+4]))
           ) {
            const dataLocalAux = cacarDatas[index] + '/' + cacarDatas[index+2] + '/' + cacarDatas[index+4]
            
            captureLancamento.parcelasLancamento[0].dataParcela = toDate(dataLocalAux)
           }
    }
    
    if(!captureLancamento.parcelasLancamento[0].dataParcela)
      captureLancamento.parcelasLancamento[0].dataParcela = new Date(Date.now())
    

    this.setState({
      itemNovo: captureLancamento
    })

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

    
    if(!item) return
    
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

  executaBotao() {
        
    if (this.state.isRecording) {
      this._stopRecognizing()      
    } else {
      
    }
  }

  async handleItemCapture(itemNovo: Lancamento | null) {   
    if(!itemNovo) {
      return ToastAndroid.show("Nenhum item adicionado", ToastAndroid.SHORT)
    }          
    
    const readItemNovo = {
      ...itemNovo
    }

    readItemNovo.categoryLancamento = readItemNovo.categoryLancamento.nomeCategoria
        
    const response = await this.props.handleAdicionarLancamento(readItemNovo, await retornarIdDoUsuario())
  
    console.log("resultado", response == "" ? "cadastrou" : response)
    if(response == '') {
      
    } else {
      ToastAndroid.show(response, ToastAndroid.SHORT)
    }
  }

  render() {
    return (
      <Container>
       
       <Header>
          <ButtonRecord 
          style={{backgroundColor: this.state.isRecording ? '#fff' : '#EE5976', borderRadius: 50}}
          onPress={this.state.isRecording ? this._stopRecognizing : this._startRecognizing}>
            <Icon 
              style={{width: 100, height: 100}} 
              name="keyboard-voice"
              color={this.state.isRecording ? '#EE5976' : '#fff'}
              size={100}
            />
          </ButtonRecord>          
       </Header>


        <Instructions style={{textAlign: 'justify'}}>
          Clique no botão e adicione por comandos de voz: Ex: “Eu comprei um sapato por 5 reais”, “Eu comprei arroz por 15 reais da categoria mercado no dia 10 do 10 de 2021”
        </Instructions>
        
        <ContainerResults>
          <Stat>
            {this.state.results.map((result, index) => {
              return (
                <Stat key={`result-${index}`}>
                  {result}
                </Stat>
              );
            })}
          </Stat>
        </ContainerResults>        
                 

        {
          this.ItemHandled(this.state.itemNovo)     
        }

        <FAB 
          icon="check"
          onPress={() => this.handleItemCapture(this.state.itemNovo)}
          style={{backgroundColor: '#ee4266'}}
        />
      </Container>
    );
  }
}

export default () => {
    const {categorias, handleReadByUserCategorias} = UseCategories()
    const {contas, handleReadByUserContas} = UseContas()
    const {handleAdicionarLancamento} = UseLancamentos()

    const {navigation} = UseDadosTemp()

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


    return (
        <VoiceTest navigation={navigation} handleAdicionarLancamento={handleAdicionarLancamento} categorias={categorias ? categorias : []} contas={contas ? contas : []}/>
    )
};