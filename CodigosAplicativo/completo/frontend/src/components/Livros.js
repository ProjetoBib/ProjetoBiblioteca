import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity 
} from 'react-native';

export default function Livros({ data }) {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      const updatedData = await Promise.all(data.map(async (item) => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${item.title}`);
        const json = await response.json();
        const imageLink = json.items && json.items[0] && json.items[0].volumeInfo.imageLinks && json.items[0].volumeInfo.imageLinks.thumbnail;
        return { ...item, image: imageLink || 'default_image_url', count: parseInt(item.quant) || 0 };
      }));
      setBookData(updatedData);
    };

    fetchBookData();
  }, [data]);

  const incrementCount = (index) => {
    const updatedData = [...bookData];
    updatedData[index].count++;
    setBookData(updatedData);
  };

  const decrementCount = (index) => {
    const updatedData = [...bookData];
    if (updatedData[index].count > 0) {
      updatedData[index].count--;
    }
    setBookData(updatedData);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {bookData.map((item, index) => (
          <View key={item._id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.cardText, styles.boldText]}>{item.title}</Text>
              <Text style={styles.infoText}>Autor: {item.author}</Text>
              <Text style={styles.infoText}>Editora: {item.pubComp}</Text>
              <Text style={styles.infoText}>Gênero: {item.genre}</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity onPress={() => incrementCount(index)} style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <View style={styles.counter}>
                  <Text style={styles.counterText}>
                    {item.quantity}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => decrementCount(index)} style={styles.button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
              </View>
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
    alignItems: 'center',
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
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  counter: {
    width: 40,
    alignItems: 'center',
  },
  counterText: {
    fontSize: 20,
    marginHorizontal: 0,
    zIndex: 1,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#3A89FF',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
