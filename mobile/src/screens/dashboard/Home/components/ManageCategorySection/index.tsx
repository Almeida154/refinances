import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import {toDate} from '../../../../../helpers/manipularDatas'

import { ProgressBar, Colors } from 'react-native-paper';

import Button from '../../../../../components/Button';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

import {
    Container,
    LabelDescription,
    Separator,
    LabelDescriptionCategory,
    SectionTop,
    ContainerCategory,
    Goal
} from './styles'

import CardCategory from './CardCategory'

import {colors, fonts, metrics} from '../../../../../styles'
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext'
import { Categoria, UseCategories } from '../../../../../contexts/CategoriesContext'
import { StackActions } from '@react-navigation/native';



const SectionManage = () => {
    const { navigation } = UseDadosTemp()
    const { categorias, handleReadByUserCategorias, handleCountByEntry } = UseCategories();

    const countbyentry = (async function(){
        handleCountByEntry(await retornarIdDoUsuario(), 'despesa')
    })

    useEffect(() => {
        // Caso nenhuma Categoria seja carregada, recarregar
        console.debug(countbyentry);
        if(!categorias)
            (async function(){
                handleReadByUserCategorias(await retornarIdDoUsuario(), 'despesa')
            }) ()
              
      }, [])
      

      if (categorias?.length > 0) {
        return (
            <Container>
            <SectionTop>
                <LabelDescription>Gerencie suas categorias e defina limites.</LabelDescription>
            </SectionTop>

            <Separator />

            <ContainerCategory>
                <LabelDescriptionCategory>Minhas categorias</LabelDescriptionCategory>

                {
                    categorias && categorias.map((item, index) => {
                        if(index < 3){
                            return (
                                <CardCategory item={item} key={index}/>
                            )
                        }
                    })
                }

                <Button
                    onPress={() =>  
                        navigation.dispatch(StackActions.replace('StackAccount', 
                        { screen:'ManageCategory'}))}
                    title="Gerenciar"
                    color={colors.darkGray}
                    backgroundColor={colors.lightGray}
                />
            </ContainerCategory>
        </Container>
        );
      } else {
        return (
            <Container>
            
            </Container>
        );
      }
}

export default SectionManage