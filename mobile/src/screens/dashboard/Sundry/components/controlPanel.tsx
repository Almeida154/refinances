// import React, { useState } from 'react';
// import {
//   Dimensions,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   TextInput,
//   Button,
// } from 'react-native';

// const { width } = Dimensions.get('screen');

// import { UseItems } from '../../../../contexts/ItemsContext';
// import { UseWants } from '../../../../contexts/WantsContext';

// const ControlPanel = () => {
//   const [verba, setVerba] = useState('0');
//   const [itensOtimos, setItensOtimos] = useState([]);
//   const { items, setItems } = UseItems();
//   const { wants, setWants } = UseWants();

//   const ComponentItem: React.FC = ({ item }) => {
//     return (
//       <View style={styles.containerItem}>
//         <View style={styles.sessionText}>
//           <Text style={{ color: 'white', fontSize: 18 }}>{item.descricao}</Text>
//           <Text style={{ color: 'white', fontSize: 18 }}>{item.preco}</Text>
//         </View>

//         <View style={styles.sessionConectaNecessidades}>
//           {item.conectaNecessidades.map(item2 => {
//             return (
//               <View style={styles.groupLabel}>
//                 <Text style={styles.textNecessidade}>{item2.necessidade}</Text>
//                 <Text style={styles.textNecessidade}>{item2.valor}</Text>
//               </View>
//             );
//           })}
//         </View>
//       </View>
//     );
//   };

//   function handleSubmit(necessidades, produtos, verba) {
//     verba = parseInt(verba);
//     const n = necessidades.length + 1;
//     const m = produtos.length + 1;

//     let arranjoDasNecessidades = new Array(m);

//     let pd = new Array(m);

//     for (var i = 0; i <= m; i++) {
//       pd[i] = new Array(verba + 1);

//       for (var j = 0; j <= verba; j++) {
//         pd[i][j] = 0;
//       }
//     }

//     for (var i = 1; i < m; i++) {
//       for (var j = 1; j <= produtos[i - 1].preco; j++) {
//         pd[i][j] = pd[i - 1][j];
//       }

//       arranjoDasNecessidades[i] = 0;

//       console.log(`i = ${i} = ${produtos[i - 1].conectaNecessidades.length}`);
//       for (var l = 0; l < produtos[i - 1].conectaNecessidades.length; l++) {
//         let soma =
//           produtos[i - 1].conectaNecessidades[l].valor +
//           necessidades[produtos[i - 1].conectaNecessidades[l].index - 1]
//             .quantidade;
//         arranjoDasNecessidades[i] +=
//           soma > 100
//             ? produtos[i - 1].conectaNecessidades[l].valor - (soma - 100)
//             : produtos[i - 1].conectaNecessidades[l].valor;
//       }

//       for (var j = produtos[i - 1].preco; j <= verba; j++) {
//         let primeiro = pd[i - 1][j];
//         let segundo =
//           pd[i - 1][j - produtos[i - 1].preco] + arranjoDasNecessidades[i];

//         // console.log("primeiro = " + primeiro)
//         // console.log("segundo = " + segundo)
//         // console.log()
//         pd[i][j] = primeiro > segundo ? primeiro : segundo;
//       }
//     }
//     let aux = [];
//     let ponteiro = verba;

//     for (var i = produtos.length; i >= 1; i--) {
//       if (pd[i][ponteiro] != pd[i - 1][ponteiro]) {
//         aux.push(produtos[i - 1]);
//         ponteiro -= produtos[i - 1].preco;
//       }
//     }

//     setItensOtimos(aux);
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={{ color: 'white', fontSize: 18 }}>Itens</Text>

//       <View
//         style={{ height: 1, backgroundColor: 'white', width: width - 80 }}
//       />

//       <TextInput
//         style={styles.textVerba}
//         onChangeText={setVerba}
//         value={verba}
//         placeholder="Valor da verba utilizada"
//         placeholderTextColor="green"
//       />
//       <Button
//         title="Otimizar"
//         onPress={() => handleSubmit(wants, items, verba)}
//       />

//       <FlatList
//         nestedScrollEnabled
//         data={itensOtimos}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => <ComponentItem item={item} />}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 300,
//     marginTop: StatusBar.currentHeight || 0,
//     width: width - 60,
//     alignItems: 'center',
//     backgroundColor: '#202731',
//     padding: 10,
//     borderRadius: 20,
//   },
//   sessionText: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   containerItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginTop: 20,
//     backgroundColor: 'gray',
//     width: width - 80,
//   },
//   textNecessidade: {
//     color: 'white',
//   },
//   sessionConectaNecessidades: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   groupLabel: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textVerba: {
//     fontSize: 15,
//     color: 'white',
//     width: '100%',
//     height: 40,
//     marginTop: 10,
//     marginBottom: 10,
//   },
// });

// export default ControlPanel;
