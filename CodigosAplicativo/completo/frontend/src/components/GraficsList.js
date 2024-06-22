import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Grafics from './grafics';

const GraficsList = ({ routes }) => {
  return (
    <ScrollView 
      horizontal 
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {routes.map((route, index) => (
        <View key={index} style={styles.item}>
          <Grafics route={route} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row', // Ensures the items are laid out in a row
  },
  item: {
    marginRight: 10, // Add spacing between items
  },
});

export default GraficsList;
