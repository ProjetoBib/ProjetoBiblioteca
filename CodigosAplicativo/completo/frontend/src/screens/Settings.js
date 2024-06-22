import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TextInput, TouchableOpacity, Animated } from 'react-native';
import { SearchBar, Card, Icon } from 'react-native-elements';
import axios from 'axios';
import Livros from '../components/Livros';

export default function Home() {
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isSlideBarVisible, setIsSlideBarVisible] = useState(false);
  const [livros, setLivros] = useState([]);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://192.168.237.66:8000/books/list');
        setLivros(response.data);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };
    fetchBooks();
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
    const filtered = livros.filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const toggleSlideBar = () => {
    if (isSlideBarVisible) {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsSlideBarVisible(false));
    } else {
      setIsSlideBarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.slideCard}>
      <Text>{item.title}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.allBooksContainer}>
        <Livros data={filteredBooks.length > 0 ? filteredBooks : livros} renderItem={renderItem} />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A89FF',
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
    paddingHorizontal: '2%',
    width: '100%',
  },
  searchBarContainer: {
    backgroundColor: '#3A89FF',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    flex: 1,
  },
  searchBarInputContainer: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#292937',
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 15,
    marginLeft: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filteredBooksContainer: {
    backgroundColor: '#2C3E50',
    padding: 10,
    marginBottom: 10,
  },
  filteredBooksTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  allBooksContainer: {
    flex: 1,
  },
  allBooksTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  slideBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#3A89FF',
    zIndex: 10,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  BotaoCad: {
    backgroundColor: '#69A5FF',
    padding: 10,
    borderRadius: 10,
    marginBottom: '3%',
  },
  BotaoCadCancelar: {
    backgroundColor: '#d14438',
    padding: 10,
    borderRadius: 10,
    marginBottom: '3%',
  },
  BotaoCadTexto: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slideCard: {
    borderRadius: 15,
    marginRight: 10,
    width: 150,
    height: 190,
  },
  selectedBook: {
    backgroundColor: 'red',
  },
  EspacoCadastro: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    marginTop: '5%',
    borderRadius: 15,
  },
  TextoCad: {
    marginLeft: 10,
  },
  InfosCad: {
    marginTop: '5%',
    marginBottom: '5%',
  },
});
