import React, { Component, useEffect } from 'react';
import {  
  TouchableHighlight,
} from 'react-native';

import {UseCategories, Categoria} from '../../../../../contexts/CategoriesContext'
import {UseContas, Conta} from '../../../../../contexts/AccountContext'
import {toDate} from '../../../../../helpers/manipularDatas'

import {
    Action,
    Button,
    Container,
    Instructions,
    Stat,
    Welcome
} from './styles'

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

type Props = {
    categorias: Categoria[],
    contas: Conta[]
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
    categorias: []   
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
  };

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
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
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
      isRecording: true
    });

    try {
      await Voice.start('pt-BR');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
      this.generatePrincipal(this.tratoNoTexto('Eu comprei um rifle por r$ 50 da categoria moradia na conta principal em 3 do 4 de 2020'))
    try {
      await Voice.stop();
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
    const comandos = { item: '', valor: '', moeda: '', fluxo: '', categoria: '', conta: '', data: '' }

    const acaoFluxoReceita = ['vendi', 'vendi um', 'vendi uma', 'recebi uma', 'recebi', 'vendido', 'recebido']
    const acaoFluxoDespesa = ['comprei ', 'comprei um', , 'comprei uma', 'comprado', 'torrei']

    const categorias = ['alimentação', 'entretenimento', 'trabalho', 'varejo', 'ferramenta']   

    // acaoFluxo
    let indexFim_acaoFluxo: any
    acaoFluxoReceita.map((item, index) => {
      if (texto.indexOf(item) != -1) {
        comandos.fluxo = 'receita'

        indexFim_acaoFluxo = texto.indexOf(item) + item.length
      }
    })

    if (comandos.fluxo == '')
      acaoFluxoDespesa.map((item, index) => {
          if(!item) return

        if (texto.indexOf(item) != -1) {
          comandos.fluxo = 'despesa'

          indexFim_acaoFluxo = texto.indexOf(item) + item.length
        }
      })

    if (comandos.fluxo == '')
      return 'nao foi:fluxo de se é receita ou despesa não encontrado'

    // item
    let i = indexFim_acaoFluxo

    for (; texto.substr(i, 3) != 'por' && i < texto.length; i++) {

      comandos.item += texto[i]
    }

    comandos.item = comandos.item.trim()

    if (comandos.item == '')
      return 'nao foi:O nome do lançamento não foi encontrado'

    // dinheiro
    let [moeda, valor] = texto.substr(i + 3).trim().split(' ')

    comandos.valor = valor
    comandos.moeda = moeda == 'r$' ? 'reais' : 'dolares'

    i += valor.length + moeda.length + 2

    
    if (comandos.valor == undefined || comandos.moeda == undefined)
    return 'nao foi:O valor ou a moeda não foram encontrados'
    //categoria
    
    // Texto a partir das categorias para frente

    const aux = texto.substr(i + 4)

    this.props.categorias.map(item => {
      if (aux.indexOf(item.nomeCategoria.toLocaleLowerCase()) != -1) {
        comandos.categoria = item.nomeCategoria
      }
    })
    
    //conta
    this.props.contas.map(item => {
        if (aux.indexOf(item.descricao.toLocaleLowerCase()) != -1) {
          comandos.conta = item.descricao
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
            
            comandos.data = toDate(dataLocalAux).toLocaleDateString()
           }
    }

    console.log(comandos)

    return JSON.stringify(comandos)
  }

  generatePrincipal(texto: string) {
    let text = "eu comprei uma coca por R$ 10"
    
    if ((text = this.primeiroComando(texto)) && text.indexOf('nao foi')) {
      console.log('caiu no primeiroComando')
      const comandosJson = JSON.parse(text)
      let itensNovo = {}

      itensNovo = {       
        item: comandosJson.item,
        fluxo: comandosJson.fluxo,
        categoria: comandosJson.categoria,
        moeda: comandosJson.moeda,
        valor: comandosJson.valor,
        data: comandosJson.data,
        conta: comandosJson.conta,
      }

      console.log(itensNovo)
    } else {
      // alert('Nenhum foi encontrado')
      console.log('deu em nada',text)
    }
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
        console.log('foies')
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
    
    console.log(this.state)
    if (this.state.isRecording) {
      this._stopRecognizing()      
      this 
      this.setState({ ...this.state, isRecording: false })
    } else {
      
      this.setState({ ...this.state, isRecording: true })
    }
  }

  render() {
    return (
      <Container>
        <Welcome>Welcome to React Native Voice!</Welcome>
        <Instructions>
          Press the button and start speaking.
        </Instructions>
        <Stat>{`Started: ${this.state.started}`}</Stat>
        <Stat>{`Recognized: ${
          this.state.recognized
        }`}</Stat>
        <Stat>{`Pitch: ${this.state.pitch}`}</Stat>
        <Stat>{`Error: ${this.state.error}`}</Stat>
        <Stat>Results</Stat>
        {this.state.results.map((result, index) => {
          return (
            <Stat key={`result-${index}`}>
              {result}
            </Stat>
          );
        })}
        <Stat>Partial Results</Stat>
        {this.state.partialResults.map((result, index) => {
          return (
            <Stat key={`partial-result-${index}`}>
              {result}
            </Stat>
          );
        })}
        <Stat>{`End: ${this.state.end}`}</Stat>
        <TouchableHighlight onPress={this._startRecognizing}>
          <Button source={require('./button.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Action>Stop Recognizing</Action>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Action>Cancel</Action>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Action>Destroy</Action>
        </TouchableHighlight>
      </Container>
    );
  }
}

export default () => {
    const {categorias, handleReadByUserCategorias} = UseCategories()
    const {contas, handleReadByUserContas} = UseContas()

    useEffect(() => {
        (async function () {
            if(!categorias) {
                handleReadByUserCategorias(await retornarIdDoUsuario(), 'despesa')
            }
            if(!contas) {
                handleReadByUserContas(await retornarIdDoUsuario())
            }
        }())
      
    }, [])


    return (
        <VoiceTest categorias={categorias ? categorias : []} contas={contas ? contas : []}/>
    )
};