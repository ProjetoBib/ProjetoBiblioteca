import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function CadEmprestimos() {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch('http://192.168.237.66:8000/reserves/list');
        const data = await response.json();
        const updatedData = await Promise.all(data.map(async (item) => {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${item.name_book}`);
          const json = await response.json();
          const imageLink = json.items && json.items[0] && json.items[0].volumeInfo.imageLinks && json.items[0].volumeInfo.imageLinks.thumbnail;
          return { ...item, image: imageLink || 'default_image_url' };
        }));
        setBookData(updatedData);
      } catch (error) {
        console.error("Error fetching book data: ", error);
      }
    };

    fetchBookData();
  }, []);

  const handleMarkReturned = async (id) => {
    try {
      const response = await axios.post('http://192.168.237.66:8000/reserves/close', { id });
      if (response.status === 200) {
        const updatedBooks = bookData.map(book => {
          if (book._id === id) {
            return { ...book, status: 2 }; // Marcado como devolvido
          }
          return book;
        });
        setBookData(updatedBooks);
      } else {
        console.error('Error closing reserve: ', response.statusText);
      }
    } catch (error) {
      console.error('Error closing reserve: ', error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 1: // Emprestado
        return styles.statusEmprestado;
      case 2: // Devolvido
        return styles.statusDevolvido;
      case 3: // Atrasado
        return styles.statusAtrasado;
      default:
        return {};
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {bookData.map((item) => (
          <View key={item._id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.cardText, styles.boldText]}>{item.name_book}</Text>
              <Text style={styles.InfoLivros}><Text style={styles.boldText}>Aluno:</Text> {item.name_reader}</Text>
              {/* <Text style={styles.InfoLivros}><Text style={styles.boldText}>Matricula:</Text> {item.id_reader}</Text> */}
              <Text style={[styles.InfoLivros, getStatusStyle(item.status)]}><Text style={styles.boldText}>Status:</Text> {item.status === 1 ? 'Emprestado' : item.status === 2 ? 'Devolvido' : 'Atrasado'}</Text>
              {item.status === 1 || item.status === 3 ? (
                <TouchableOpacity onPress={() => handleMarkReturned(item._id)} style={styles.devolverButton}>
                  <Text style={styles.devolverButtonText}>Devolver</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 150,
  },
  card: {
    width: Dimensions.get('window').width * 0.9,
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  imageContainer: {
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  InfoLivros: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  statusEmprestado: {
    color: '#3A89FF',
  },
  statusDevolvido: {
    color: '#4CAF50',
  },
  statusAtrasado: {
    color: 'red',
  },
  devolverButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
  },
  devolverButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
