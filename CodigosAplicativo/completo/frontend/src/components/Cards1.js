import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, FlatList } from 'react-native';
import { SearchBar, Card, Icon } from 'react-native-elements';
import { CardContainer } from './Cards/styles';

export default  function Cards({ text = 'oi', background = 'white', imagem}) {
    const styles = StyleSheet.create({
        card: {
          backgroundColor: background,
          width:150, // slightly less than 50% to account for spacing
          height:  100, // 20% of screen height
          borderRadius: 15,
          borderColor: background,

          marginBottom: '2%',
        },
        TextoCardConteiner:{
            color:"red",
            fontSize:50,
        }
        
      });

    return (
        <CardContainer>
            <Card title="Card de Informação" containerStyle={styles.card}>
                <Text style={styles.TextoCardConteiner}>{text}</Text>
            </Card>
        </CardContainer>
    )
}