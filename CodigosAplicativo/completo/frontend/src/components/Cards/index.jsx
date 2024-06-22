import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { CardContainer } from './styles';

export function Cards({text = 'Sem Info', background = 'white', imagem}) {
    const styles = StyleSheet.create({
        card: {
          backgroundColor: "#292937",
          width:150, // slightly less than 50% to account for spacing
          height:  100, // 20% of screen height
          borderRadius: 15,
          borderColor: "#292937",

          marginBottom: '2%',
        },
        TextoCardConteiner:{
            color: '#ffff',
            fontWeight: 'bold',
            fontSize:18,
        },
        
      });

    return (
        <CardContainer>
            <Card title="Card de Informação" containerStyle={styles.card}>
                <Text style={styles.TextoCardConteiner}>{text}</Text>
                
            </Card>
        </CardContainer>
    )
}