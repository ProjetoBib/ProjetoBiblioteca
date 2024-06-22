import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';

const Grafics = ({ route }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeout;
    
    // Define uma função para fazer a requisição com axios
    const fetchData = () => {
      axios.get(`http://192.168.237.66:5000/${route}`, { responseType: 'blob' })
        .then(response => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageUrl(reader.result);
            setLoading(false);
          };
          reader.readAsDataURL(response.data);
        })
        .catch(error => {
          console.log('Error fetching image:', error);
          setLoading(false);
        });
    };

    fetchData();
    timeout = setTimeout(fetchData, 2000);

    return () => clearTimeout(timeout); // Limpa o timeout ao desmontar o componente
  }, [route]);

  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text style={styles.errorText}>Failed to load image</Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 340,
    height: 240,
    resizeMode: 'contain',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 18,
  },
});

export default Grafics;
