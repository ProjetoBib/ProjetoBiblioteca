import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GraficsList from '../components/GraficsList';

export default function Home() {
  const emprestimosRoutes = [
    'emprestimos_por_ano',
    'livros_mais_emprestados',
    'emprestimos_por_serie',
    'autores_mais_emprestados',
    'editoras_mais_emprestadas',
    'usuarios_mais_ativos',
    'emprestimos_ano_serie',
    'tendencia_emprestimos',
  ];

  const livrosRoutes = [
    'generos_mais_quantidade',
    'livros_por_editora',
    'livros_por_genero',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Relatórios de <Text style={styles.desctTitle}>Empréstimos</Text></Text>
        
        <GraficsList routes={emprestimosRoutes} />
      </View>
      <View style={styles.section}>
      <Text style={styles.sectionTitle}>Relatórios de <Text style={styles.desctTitle}>Livros</Text></Text>
        <GraficsList routes={livrosRoutes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A89FF',
  },
  section: {
    marginBottom: 3,
    
  },
  sectionTitle: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: 'light',
  },
  desctTitle: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
